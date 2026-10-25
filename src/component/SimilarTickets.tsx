"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { AiSource, getApiErrorMsg, getSimilarTickets } from "@/services/aiService";

interface SimilarTicketsProps {
    title?: string;
    description?: string;
}

// Current ticket jaise purane tickets (semantic search)
export default function SimilarTickets({ title, description }: SimilarTicketsProps) {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<AiSource[] | null>(null);

    const handleSearch = async () => {
        const query = `${title ?? ""}. ${description ?? ""}`.trim().slice(0, 500);
        if (!title && !description) return toast.error("Ticket details are not loaded yet");

        try {
            setLoading(true);
            const res = await getSimilarTickets(query);
            if (res?.status) setResults(res.data ?? []);
            else toast.error(res?.msg || "Could not find similar tickets");
        } catch (err) {
            toast.error(getApiErrorMsg(err, "AI service error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold">Similar Tickets</h3>
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleSearch}
                    className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-300 transition hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Searching..." : "🔍 Find Similar"}
                </button>
            </div>

            <div className="min-h-20 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                {loading ? (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-3 w-full rounded bg-white/10" />
                        <div className="h-3 w-4/5 rounded bg-white/10" />
                    </div>
                ) : results === null ? (
                    <p className="text-center text-slate-400">Press &quot;Find Similar&quot; to see related past tickets</p>
                ) : results.length === 0 ? (
                    <p className="text-center text-slate-400">No similar tickets found</p>
                ) : (
                    <ul className="space-y-2">
                        {results.map((t) => (
                            <li key={t.ticketId} className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-slate-200">{t.title}</p>
                                    <p className="text-xs text-slate-500">{t.category}</p>
                                </div>
                                <span className="shrink-0 rounded-full border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-xs text-sky-400">
                                    {Math.round(t.score * 100)}%
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
