"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table, { TableColumn } from "@/component/Table";
import { getApiErrorMsg } from "@/services/aiService";
import { AiFeatureStat, AiStats, getAiStats } from "@/services/admin/aiAdminService";

const featureLabels: Record<string, string> = {
    ticket_classify: "Ticket auto classification",
    ticket_summary: "Ticket summary (agent)",
    suggested_reply: "Suggested reply (agent)",
    similar_tickets: "Similar tickets (agent)",
    agent_ask: "Agent assistant",
    customer_assistant: "Customer assistant",
    knowledge_add: "Knowledge add",
    knowledge_update: "Knowledge update",
    knowledge_reindex: "Knowledge re-index",
    index_tickets: "Index tickets",
    chat: "Raw chat",
    evaluation: "Evaluation script",
    unknown: "Other",
};
const label = (feature: string) => featureLabels[feature] ?? feature;
const num = (n: number) => n.toLocaleString();

function StatCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
            <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
            {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
    );
}

// Admin: AI calls, errors, tokens, latency aur cost ka overview
export default function AiMonitoringPage() {
    const [days, setDays] = useState(7);
    const [stats, setStats] = useState<AiStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                setLoading(true);
                const res = await getAiStats(days);
                if (cancelled) return;
                if (res?.status && res.data) setStats(res.data);
                else toast.error(res?.msg || "Could not load AI stats");
            } catch (err) {
                if (!cancelled) toast.error(getApiErrorMsg(err, "Could not load AI stats"));
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [days, refreshKey]);

    const columns: TableColumn<AiFeatureStat>[] = [
        { header: "Feature", accessor: (row) => label(row.feature), className: "font-medium text-slate-800" },
        { header: "Calls", accessor: (row) => num(row.calls) },
        { header: "Errors", accessor: (row) => num(row.errors) },
        { header: "Tokens (in / out)", accessor: (row) => `${num(row.inputTokens)} / ${num(row.outputTokens)}` },
        { header: "Avg latency", accessor: (row) => `${num(row.avgLatencyMs)} ms` },
        { header: "Est. cost", accessor: (row) => (row.estimatedCostUsd === null ? "-" : `$${row.estimatedCostUsd}`) },
    ];

    const totals = stats?.totals;
    const maxDaily = Math.max(1, ...(stats?.daily ?? []).map((d) => d.calls));

    return (
        <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">AI Monitoring</h2>
                    <p className="mt-1 text-sm text-slate-500">Calls, errors, tokens, speed and cost of every AI feature.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500"
                    >
                        <option value={1}>Last 24 hours</option>
                        <option value={7}>Last 7 days</option>
                        <option value={30}>Last 30 days</option>
                        <option value={90}>Last 90 days</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => setRefreshKey((k) => k + 1)}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <StatCard title="AI calls" value={loading || !totals ? "-" : num(totals.calls)} />
                <StatCard
                    title="Errors"
                    value={loading || !totals ? "-" : num(totals.errors)}
                    hint={totals ? `${totals.errorRate}% of calls` : undefined}
                />
                <StatCard
                    title="Tokens"
                    value={loading || !totals ? "-" : num(totals.inputTokens + totals.outputTokens)}
                    hint={totals ? `${num(totals.inputTokens)} in / ${num(totals.outputTokens)} out` : undefined}
                />
                <StatCard
                    title="Avg latency"
                    value={loading || !totals ? "-" : `${num(totals.avgLatencyMs)} ms`}
                />
                <StatCard
                    title="Est. cost"
                    value={loading || !totals ? "-" : totals.estimatedCostUsd === null ? "Not set" : `$${totals.estimatedCostUsd}`}
                    hint={totals && totals.estimatedCostUsd === null ? "Set AI_COST_PER_1M_INPUT / OUTPUT in backend .env" : undefined}
                />
            </div>

            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-800">Calls per day</h3>
                {stats && stats.daily.length > 0 ? (
                    <div className="flex h-40 items-end gap-2 overflow-x-auto">
                        {stats.daily.map((d) => (
                            <div key={d.date} className="flex min-w-10 flex-1 flex-col items-center justify-end gap-1">
                                <span className="text-xs text-slate-500">{d.calls}</span>
                                <div
                                    className={`w-full rounded-t ${d.errors > 0 ? "bg-amber-400" : "bg-indigo-500"}`}
                                    style={{ height: `${Math.max(4, (d.calls / maxDaily) * 100)}px` }}
                                    title={`${d.calls} calls, ${d.errors} errors`}
                                />
                                <span className="text-[10px] text-slate-400">{d.date.slice(5)}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-slate-500">{loading ? "Loading..." : "No AI calls in this period yet."}</p>
                )}
                <p className="mt-3 text-xs text-slate-400">Orange bars are days with at least one error.</p>
            </div>

            <h3 className="mb-3 text-base font-semibold text-slate-800">By feature</h3>
            <Table
                columns={columns}
                data={stats?.byFeature ?? []}
                keyExtractor={(row) => row.feature}
                loading={loading}
                emptyMessage="No AI calls in this period yet."
            />

            <h3 className="mb-3 mt-8 text-base font-semibold text-slate-800">Recent errors</h3>
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                {stats && stats.recentErrors.length > 0 ? (
                    <ul className="divide-y divide-slate-100">
                        {stats.recentErrors.map((e) => (
                            <li key={e._id} className="flex items-start justify-between gap-4 px-6 py-3 text-sm">
                                <div className="min-w-0">
                                    <p className="font-medium text-slate-800">{label(e.feature)} ({e.kind})</p>
                                    <p className="truncate text-xs text-red-500">{e.error ?? "Unknown error"}</p>
                                </div>
                                <span className="shrink-0 text-xs text-slate-400">{new Date(e.createdAt).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="px-6 py-6 text-sm text-slate-500">{loading ? "Loading..." : "No errors in this period."}</p>
                )}
            </div>
        </div>
    );
}
