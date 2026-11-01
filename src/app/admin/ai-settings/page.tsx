"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getApiErrorMsg, indexAllTickets } from "@/services/aiService";
import { AiSettings, AiToggles, getAiSettings, updateAiSettings } from "@/services/admin/aiAdminService";
import { reindexKnowledge } from "@/services/admin/knowledgeService";

const toggleTrack =
    "h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:bg-indigo-600 peer-checked:after:translate-x-5";

const toggleRows: { key: keyof AiToggles; title: string; hint: string }[] = [
    { key: "aiEnabled", title: "AI (master switch)", hint: "Turn off to stop every AI feature. Tickets and chat keep working." },
    { key: "classificationEnabled", title: "Ticket AI", hint: "Auto category and priority, ticket summary, suggested reply." },
    { key: "assistantEnabled", title: "AI assistant", hint: "Customer assistant and the agent assistant (answers from knowledge base and past tickets)." },
];

function Row({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-100 py-2.5 text-sm last:border-0">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-800">{value}</span>
        </div>
    );
}

// Admin: AI on/off switches, config (sirf dekhne ke liye) aur indexing tools
export default function AiSettingsPage() {
    const [settings, setSettings] = useState<AiSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const load = async () => {
        try {
            const res = await getAiSettings();
            if (res?.status && res.data) setSettings(res.data);
            else toast.error(res?.msg || "Could not load AI settings");
        } catch (err) {
            toast.error(getApiErrorMsg(err, "Could not load AI settings"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        load();
    }, []);

    const handleToggle = async (key: keyof AiToggles, value: boolean) => {
        if (!settings) return;
        const previous = settings.toggles;
        setSettings({ ...settings, toggles: { ...previous, [key]: value } }); // turant dikhao
        try {
            const res = await updateAiSettings({ [key]: value });
            if (res?.status) toast.success(res.msg || "Updated");
            else throw new Error(res?.msg);
        } catch (err) {
            setSettings({ ...settings, toggles: previous }); // fail hua to wapas
            toast.error(getApiErrorMsg(err, "Could not update setting"));
        }
    };

    const handleIndexTickets = async () => {
        try {
            setBusy("tickets");
            const res = await indexAllTickets();
            if (res?.status) toast.success(`${res.indexed ?? 0} tickets indexed, ${res.skipped ?? 0} skipped (too short)`);
            else toast.error(res?.msg || "Indexing failed");
            await load();
        } catch (err) {
            toast.error(getApiErrorMsg(err, "Indexing failed"));
        } finally {
            setBusy(null);
        }
    };

    const handleReindexKnowledge = async () => {
        try {
            setBusy("knowledge");
            const res = await reindexKnowledge();
            if (res?.status) toast.success(res.msg || "Re-indexed");
            else toast.error(res?.msg || "Re-index failed");
            await load();
        } catch (err) {
            toast.error(getApiErrorMsg(err, "Re-index failed"));
        } finally {
            setBusy(null);
        }
    };

    if (loading) return <p className="p-8 text-slate-500">Loading...</p>;
    if (!settings) return <p className="p-8 text-slate-500">Could not load AI settings.</p>;

    const { toggles, config, vectors } = settings;
    const limits = config.rateLimitsPer15Min;

    return (
        <div className="p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">AI Settings</h2>
                <p className="mt-1 text-sm text-slate-500">Switch AI features on or off and check how AI is configured.</p>
            </div>

            {!toggles.aiEnabled && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
                    AI is turned off. Tickets are still created, but without AI category, summary or replies.
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-slate-800">Features</h3>
                    <div className="space-y-3">
                        {toggleRows.map((row) => (
                            <div key={row.key} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                                <div className="pr-4">
                                    <p className="text-sm font-medium text-slate-700">{row.title}</p>
                                    <p className="text-xs text-slate-500">{row.hint}</p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={toggles[row.key]}
                                        onChange={(e) => handleToggle(row.key, e.target.checked)}
                                    />
                                    <div className={toggleTrack} />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-base font-semibold text-slate-800">Vector database</h3>
                    <Row label="Indexed tickets" value={vectors.tickets ?? "unavailable"} />
                    <Row label="Knowledge entries (vectors)" value={vectors.knowledge ?? "unavailable"} />
                    <div className="mt-4 flex flex-wrap gap-3">
                        <button
                            type="button"
                            disabled={busy !== null}
                            onClick={handleIndexTickets}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {busy === "tickets" ? "Indexing..." : "Index all tickets"}
                        </button>
                        <button
                            type="button"
                            disabled={busy !== null}
                            onClick={handleReindexKnowledge}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {busy === "knowledge" ? "Re-indexing..." : "Re-index knowledge base"}
                        </button>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-base font-semibold text-slate-800">Models</h3>
                    <Row label="Language model" value={config.llmModel} />
                    <Row label="Embedding model" value={config.embeddingModel} />
                    <Row label="Embedding dimension" value={config.embeddingDimension} />
                    <Row label="Max output tokens" value={config.maxOutputTokens} />
                    <Row label="Cost rates set" value={config.costConfigured ? "Yes" : "No (see .env)"} />
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 text-base font-semibold text-slate-800">Search and limits</h3>
                    <Row label="Chunks sent to the AI (top K)" value={config.topK} />
                    <Row label="Minimum match score" value={config.minScore} />
                    <Row label="Max question length" value={`${config.maxQuestionLength} chars`} />
                    <Row label="Max knowledge entry" value={`${config.maxKnowledgeLength} chars`} />
                    <Row label="Customer assistant limit" value={`${limits.customerAssistant} / 15 min / user`} />
                    <Row label="Ticket create and chat limit" value={`${limits.ticketAndChat} / 15 min / user`} />
                    <Row label="Agent tools limit" value={`${limits.agentTools} / 15 min / user`} />
                    <Row label="Admin AI actions limit" value={`${limits.adminAi} / 15 min / user`} />
                </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
                Models, scores and limits are set in the backend (.env), so a mistake here cannot break the app.
            </p>
        </div>
    );
}
