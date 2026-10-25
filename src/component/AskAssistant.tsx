"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { AiSource, askAssistant, getApiErrorMsg } from "@/services/aiService";

// Agent sawaal poochta hai -> RAG (purane resolved tickets) se jawab + sources
export default function AskAssistant() {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState<string | null>(null);
    const [found, setFound] = useState<boolean | null>(null);
    const [sources, setSources] = useState<AiSource[]>([]);

    const handleAsk = async () => {
        const q = question.trim();
        if (!q) return toast.error("Please type a question");
        if (q.length > 500) return toast.error("Question is too long (max 500 characters)");

        try {
            setLoading(true);
            const res = await askAssistant(q);
            if (res?.status) {
                setAnswer(res.answer ?? "");
                setFound(Boolean(res.found));
                setSources(res.sources ?? []);
            } else {
                toast.error(res?.msg || "Could not get an answer");
            }
        } catch (err) {
            toast.error(getApiErrorMsg(err, "AI service error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4">
                <h3 className="text-base font-semibold">Ask AI Assistant</h3>
                <p className="mt-1 text-xs text-slate-500">
                    Answers are generated from similar past tickets.
                </p>
            </div>

            <div className="flex gap-3">
                <input
                    type="text"
                    value={question}
                    maxLength={500}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !loading && handleAsk()}
                    placeholder="e.g. Customer cannot reset password, what worked before?"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleAsk}
                    className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-2.5 text-sm font-medium text-purple-300 transition hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Thinking..." : "✨ Ask"}
                </button>
            </div>

            {loading && (
                <div className="mt-4 space-y-3 animate-pulse">
                    <div className="h-3 w-full rounded bg-white/10" />
                    <div className="h-3 w-4/5 rounded bg-white/10" />
                    <div className="h-3 w-3/5 rounded bg-white/10" />
                </div>
            )}

            {!loading && answer !== null && (
                <div className="mt-4 space-y-4">
                    <div
                        className={`rounded-xl border p-4 text-sm leading-relaxed whitespace-pre-wrap ${found
                            ? "border-emerald-500/20 bg-emerald-500/10 text-slate-200"
                            : "border-amber-500/20 bg-amber-500/10 text-amber-200"
                            }`}
                    >
                        {answer}
                    </div>

                    {sources.length > 0 && (
                        <div>
                            <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                                Sources (past tickets)
                            </p>
                            <ul className="space-y-2">
                                {sources.map((s) => (
                                    <li
                                        key={s.ticketId}
                                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-slate-200">{s.title}</p>
                                            <p className="text-xs text-slate-500">{s.category}</p>
                                        </div>
                                        <span className="shrink-0 rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-xs text-sky-400">
                                            {Math.round(s.score * 100)}% match
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
