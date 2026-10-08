"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTicketDetails, Ticket, upadteTicketDetails } from "@/services/agent/ticketService";
import { toast } from "react-toastify";
import ChatThread from "@/component/ChatThread";
import { getMessages } from "@/services/agent/messageService";
import { AiSummary, getAiTicketSummary } from "@/services/aiService";

const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-2 block text-sm font-medium text-slate-300";

const priorityStyles: Record<string, string> = {
    low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    urgent: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function EditTicketPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const params = useParams();
    const id = params.id as string;
    const [ticketDetail, setTicketDetail] = useState<Partial<Ticket>>({});
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [aiSummary, setAiSummary] = useState<AiSummary>({});
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTicketDetail((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const finalPayload = {
                status: ticketDetail?.status,
                priority: ticketDetail?.priority
            }

            const response = await upadteTicketDetails(finalPayload, id);
            if (response?.status) {
                toast.success(response?.msg);
                router.push("/agent/ticket");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchTicketSummary = async () => {
        try {
            const ticketSummaryPayload = {
                title: ticketDetail?.title,
                description: ticketDetail?.description,
            }
            const response = await getAiTicketSummary(ticketSummaryPayload, id);
            console.log(response, "AI summary response");
            if (response) {
                setAiSummary(response?.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSummaryLoading(false);
        }
    }

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await getTicketDetails(id);
                if (response?.status) setTicketDetail(response?.data ?? {});
            } catch (err) {
                console.log(err);
            }
        }
        fetchTicketDetails();
    }, [id, aiSummary])

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 lg:block">
                <div className="flex h-16 items-center border-b border-white/10 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold">
                            AI
                        </div>
                        <span className="text-lg font-bold">SupportDesk</span>
                    </div>
                </div>

                <nav className="space-y-1 p-4">
                    <Link
                        href="/agent"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>

                    <Link
                        href="/agent/ticket"
                        className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm font-medium text-blue-400"
                    >
                        <span>▣</span>
                        Assigned Tickets
                    </Link>

                    <Link
                        href="/agent/profile"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <span>◉</span>
                        Profile
                    </Link>
                </nav>

                <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold">
                            {user?.email?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                {user?.email || "Agent"}
                            </p>
                            <p className="text-xs text-blue-400">Support Agent</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="lg:ml-64">

                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">
                    <div>
                        <h1 className="text-lg font-semibold">Edit Ticket</h1>
                        <p className="text-xs text-slate-500">
                            Update status, priority, agent and category
                        </p>
                    </div>

                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium">{user?.email || "Agent"}</p>
                        <p className="text-xs text-slate-500">Support Agent</p>
                    </div>
                </header>

                <div className="p-6">

                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/agent" className="hover:text-white">Dashboard</Link>
                        <span>/</span>
                        <Link href="/agent/ticket" className="hover:text-white">Assigned Tickets</Link>
                        <span>/</span>
                        <span className="text-slate-300">Edit</span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">Edit Ticket</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Review the ticket details and update its progress.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                            {/* Left: ticket info (read-only) */}
                            <div className="space-y-6 xl:col-span-2">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <h3 className="mb-5 text-base font-semibold">Ticket Details</h3>

                                    <div className="space-y-5">
                                        <div>
                                            <label className={labelClass}>Title</label>
                                            <input
                                                type="text"
                                                readOnly
                                                placeholder="Ticket title"
                                                className={`${fieldClass} cursor-not-allowed text-slate-300`}
                                                value={ticketDetail?.title}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>Description</label>
                                            <textarea
                                                rows={6}
                                                readOnly
                                                placeholder="Ticket description"
                                                className={`${fieldClass} cursor-not-allowed resize-none text-slate-300`}
                                                value={ticketDetail?.description}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <label className={labelClass}>Customer Name</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className={`${fieldClass} cursor-not-allowed text-slate-300`}
                                                    value={`${ticketDetail?.customerId?.firstName} ${ticketDetail?.customerId?.lastName}`}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Customer Email</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className={`${fieldClass} cursor-not-allowed text-slate-300`}
                                                    value={ticketDetail?.customerId?.email}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: editable fields */}
                            <div className="space-y-6">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <h3 className="mb-5 text-base font-semibold">Update Ticket</h3>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="status" className={labelClass}>Status</label>
                                            <select value={ticketDetail?.status} id="status" name="status" className={fieldClass} onChange={handleChange}>
                                                <option className="bg-slate-900" value="open">Open</option>
                                                <option className="bg-slate-900" value="pending">Pending</option>
                                                <option className="bg-slate-900" value="in-progress">In Progress</option>
                                                <option className="bg-slate-900" value="resolved">Resolved</option>
                                                <option className="bg-slate-900" value="closed">Closed</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="priority" className={labelClass}>Priority</label>
                                            <select value={ticketDetail?.priority} id="priority" name="priority" className={fieldClass} onChange={handleChange}>
                                                <option className="bg-slate-900" value="low">Low</option>
                                                <option className="bg-slate-900" value="medium">Medium</option>
                                                <option className="bg-slate-900" value="high">High</option>
                                                <option className="bg-slate-900" value="urgent">Urgent</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="assignedAgentId" className={labelClass}>Assigned To</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className={`${fieldClass} cursor-not-allowed text-slate-300`}
                                                value={`${ticketDetail?.assignedAgentId?.firstName} ${ticketDetail?.assignedAgentId?.lastName}`}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="categoryId" className={labelClass}>Category</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className={`${fieldClass} cursor-not-allowed text-slate-300`}
                                                value={ticketDetail?.categoryId?.name}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center justify-end gap-3">
                                    <Link
                                        href="/agent/ticket"
                                        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Live chat (form ke bahar, taaki nested form na bane) */}
                    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="xl:col-span-2">
                            <ChatThread ticketId={id} fetchMessages={getMessages} showSuggestReply />
                        </div>

                        {/* AI Summary box (abhi sirf UI, API/state baad me) */}
                        <div className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-base font-semibold">AI Summary</h3>
                                <button
                                    type="button"
                                    className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-300 transition hover:bg-purple-500/20 cursor-pointer"
                                    onClick={() => fetchTicketSummary()}
                                >
                                    ✨ Generate Summary
                                </button>
                            </div>
                            <div className="min-h-32 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                                {summaryLoading ? (
                                    <div className="space-y-3 animate-pulse">
                                        <div className="h-3 w-1/3 rounded bg-white/10" />
                                        <div className="h-3 w-full rounded bg-white/10" />
                                        <div className="h-3 w-4/5 rounded bg-white/10" />
                                    </div>
                                ) : aiSummary ? (
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {
                                                aiSummary.category &&
                                                <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
                                                    {aiSummary.category}
                                                </span>
                                            }
                                            {
                                                aiSummary.priority &&
                                                <span
                                                    className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${priorityStyles[aiSummary?.priority?.toLowerCase()] ??
                                                        "bg-white/10 text-slate-300 border-white/10"
                                                        }`}
                                                >
                                                    {aiSummary.priority} priority
                                                </span>
                                            }
                                        </div>

                                        <div>
                                            <p className="mb-1 text-xs uppercase tracking-wide text-slate-500">
                                                Summary
                                            </p>
                                            <p className="leading-relaxed text-slate-200">{aiSummary.summary ?? "The AI couldn't produce a summary, category or priority for this ticket. Please review the ticket details and conversation manually."}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full min-h-24 flex-col items-center justify-center text-center text-slate-400">
                                        <p>Right now there is not any summary</p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            For view AI summary, category aur priority &quot; Press &quot; Generate Summary
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
