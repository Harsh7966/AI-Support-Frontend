"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PortalShell from "@/component/PortalShell";
import { askCustomerAssistant, getApiErrorMsg, KbSource } from "@/services/aiService";

interface ChatItem {
    id: number;
    role: "user" | "assistant";
    text: string;
    found?: boolean;
    sources?: KbSource[];
    usedTickets?: boolean;
}

const MAX_LENGTH = 500;
const suggestions = [
    "How do I reset my password?",
    "What is the status of my tickets?",
    "How can I get a refund?",
    "How do I cancel my subscription?",
];

// Customer AI assistant: help articles (knowledge base) + customer ke apne tickets se jawab.
// AI sirf yahin jawab dikhata hai, ticket chat me kabhi apne aap kuch nahi bhejta.
export default function CustomerAiAssistantPage() {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<ChatItem[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const nextId = useRef(1);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [items, loading]);

    const handleAsk = async (text?: string) => {
        const q = (text ?? question).trim();
        if (!q || loading) return;
        if (q.length > MAX_LENGTH) return toast.error(`Question is too long (max ${MAX_LENGTH} characters)`);

        setItems((prev) => [...prev, { id: nextId.current++, role: "user", text: q }]);
        setQuestion("");

        try {
            setLoading(true);
            const res = await askCustomerAssistant(q);
            if (res?.status) {
                setItems((prev) => [
                    ...prev,
                    {
                        id: nextId.current++,
                        role: "assistant",
                        text: res.answer ?? "",
                        found: Boolean(res.found),
                        sources: res.sources ?? [],
                        usedTickets: (res.toolsUsed ?? []).length > 0,
                    },
                ]);
            } else {
                toast.error(res?.msg || "Could not get an answer");
            }
        } catch (err) {
            toast.error(getApiErrorMsg(err, "AI service error. Please try again or create a ticket."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <PortalShell role="customer" title="AI Assistant">
            <div className="mx-auto flex max-w-3xl flex-col p-6">
                <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    Ask about our policies, or about your own tickets. Answers come from our help articles and your
                    tickets. The assistant can only read information, it cannot change anything or promise refunds.
                </div>

                <div className="min-h-[360px] space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                    {items.length === 0 && !loading && (
                        <div className="space-y-3 py-6 text-center">
                            <p className="text-sm text-slate-400">Try one of these questions</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => handleAsk(s)}
                                        className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs text-purple-300 transition hover:bg-purple-500/20"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {items.map((item) =>
                        item.role === "user" ? (
                            <div key={item.id} className="flex justify-end">
                                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2.5 text-sm text-white">
                                    {item.text}
                                </div>
                            </div>
                        ) : (
                            <div key={item.id} className="flex justify-start">
                                <div className="max-w-[85%] space-y-3">
                                    <div
                                        className={`whitespace-pre-wrap rounded-2xl rounded-bl-sm border px-4 py-3 text-sm leading-relaxed ${
                                            item.found
                                                ? "border-emerald-500/20 bg-emerald-500/10 text-slate-200"
                                                : "border-amber-500/20 bg-amber-500/10 text-amber-200"
                                        }`}
                                    >
                                        {item.text}
                                    </div>

                                    {item.usedTickets && (
                                        <p className="text-xs text-sky-400">Checked your tickets for this answer</p>
                                    )}

                                    {item.sources && item.sources.length > 0 && (
                                        <div>
                                            <p className="mb-1 text-xs uppercase tracking-wide text-slate-500">
                                                Help articles used
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.sources.map((s) => (
                                                    <span
                                                        key={s.docId}
                                                        className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs text-sky-300"
                                                    >
                                                        {s.title}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {!item.found && (
                                        <Link
                                            href="/user/create-ticket"
                                            className="inline-block rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300 transition hover:bg-blue-500/20"
                                        >
                                            Create a ticket
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )
                    )}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 animate-pulse">
                                <div className="h-3 w-48 rounded bg-white/10" />
                                <div className="h-3 w-32 rounded bg-white/10" />
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                <div className="mt-4 flex gap-3">
                    <input
                        type="text"
                        value={question}
                        maxLength={MAX_LENGTH}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                        placeholder="Type your question..."
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                        type="button"
                        disabled={loading || !question.trim()}
                        onClick={() => handleAsk()}
                        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Thinking..." : "Ask"}
                    </button>
                </div>
                <p className="mt-2 text-right text-xs text-slate-500">
                    {question.length}/{MAX_LENGTH}
                </p>
            </div>
        </PortalShell>
    );
}
