"use client";

import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/services/socket";
import { jwtDecode } from "jwt-decode";

export interface ChatMessage {
    _id: string;
    ticketId: string;
    senderId: string;
    senderRole: string;
    message: string;
    createdAt: string;
}

interface ChatThreadProps {
    ticketId: string;
    fetchMessages: (ticketId: string) => Promise<{ status: boolean; data?: ChatMessage[] }>;
    showSuggestReply?: boolean; // sirf agent page par true (abhi sirf UI, koi logic nahi)
}

/*
  FLOW (page khulte hi):
  1) GET API se purane messages -> state me
  2) socket se ticket room join
  3) "new-message" sunte raho -> state me jodte jao
  Send dabane par sirf socket.emit("send-message") karna hai.
  Message list server ke "new-message" se hi update hoti hai (khud mat jodna, warna double dikhega).
*/
export default function ChatThread({ ticketId, fetchMessages, showSuggestReply = false }: ChatThreadProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [text, setText] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const token = localStorage.getItem("token");
    const myId = token ? jwtDecode<{ userId: string }>(token).userId : "";

    useEffect(() => {
        const socket = getSocket();

        // 1) History (GET API). Agar isse pehle koi live message aa gaya ho to dono jod do
        fetchMessages(ticketId).then((res) => {
            if (!res?.status) return;
            setMessages((prev) => {
                const history = res.data ?? [];
                const ids = new Set(history.map((m) => m._id));
                return [...history, ...prev.filter((m) => !ids.has(m._id))];
            });
        });

        // 2) Room join (connect/reconnect dono par, taaki net jaane ke baad bhi chale)
        const join = () => socket.emit("join-ticket", ticketId);
        join();
        socket.on("connect", join);

        // 3) Live message aaya -> list me jodo (same ticket ka ho aur pehle se na ho)
        const onNewMessage = (msg: ChatMessage) => {
            if (msg.ticketId !== ticketId) return;
            setMessages((prev) => (prev.some((m) => m._id === msg._id) ? prev : [...prev, msg]));
        };
        socket.on("new-message", onNewMessage);

        // Cleanup: page chhodte waqt listeners hatao (warna message double aayenge)
        return () => {
            socket.off("connect", join);
            socket.off("new-message", onNewMessage);
        };
    }, [ticketId]);

    // Naya message aane par neeche scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!text.trim()) return;
        getSocket().emit("send-message", { ticketId, message: text });
        setText("");
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-base font-semibold">Conversation</h3>

            {/* Messages */}
            <div className="mb-4 h-80 space-y-3 overflow-y-auto pr-2">
                {messages.length === 0 && (
                    <p className="text-center text-sm text-slate-500">No messages yet. Say hello!</p>
                )}

                {messages.map((m) => {
                    const mine = m.senderId === myId;
                    return (
                        <div key={m._id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${mine ? "bg-blue-600 text-white" : "bg-white/10 text-slate-200"
                                    }`}
                            >
                                <p className="whitespace-pre-wrap break-words">{m.message}</p>
                                <p className="mt-1 text-[10px] opacity-60">
                                    {new Date(m.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Send box (form nahi hai, kyunki agent page par ye <form> ke bahar bhi chalna chahiye) */}
            <div className="flex gap-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                {showSuggestReply && (
                    <button
                        type="button"
                        className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-2.5 text-sm font-medium text-purple-300 transition hover:bg-purple-500/20"
                    >
                        ✨ Suggest Reply
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleSend}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
