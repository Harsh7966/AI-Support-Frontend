"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ChatThread from "@/component/ChatThread";
import { getMessages } from "@/services/customer/messageService";
import { getTicketDetails } from "@/services/customer/ticketService";

interface TicketDetail {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    categoryId?: { name?: string };
    assignedAgentId?: { firstName?: string; lastName?: string } | null;
}

const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 outline-none cursor-not-allowed";
const labelClass = "mb-2 block text-sm font-medium text-slate-300";

export default function TicketDetailPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const id = useParams().id as string;
    const [ticket, setTicket] = useState<TicketDetail>({});

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await getTicketDetails(id);
                if (response?.status) setTicket((response.data ?? {}) as TicketDetail);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTicket();
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 lg:block">
                <div className="flex h-16 items-center border-b border-white/10 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 font-bold">
                            AI
                        </div>
                        <span className="text-lg font-bold">SupportDesk</span>
                    </div>
                </div>

                <nav className="space-y-1 p-4">
                    <Link href="/user" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
                        <span>⌂</span> Dashboard
                    </Link>
                    <Link href="/user/tickets" className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm font-medium text-blue-400">
                        <span>▣</span> My Tickets
                    </Link>
                    <Link href="/user/create-ticket" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
                        <span>＋</span> Create Ticket
                    </Link>
                </nav>
            </aside>

            {/* Main */}
            <main className="lg:ml-64">
                <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">
                    <div>
                        <h1 className="text-lg font-semibold">Ticket Details</h1>
                        <p className="text-xs text-slate-500">View your ticket and chat with the support agent</p>
                    </div>
                </header>

                <div className="p-6">
                    <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/user" className="hover:text-white">Dashboard</Link>
                        <span>/</span>
                        <Link href="/user/tickets" className="hover:text-white">My Tickets</Link>
                        <span>/</span>
                        <span className="text-slate-300">Details</span>
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                        {/* Left: ticket info + chat */}
                        <div className="space-y-6 xl:col-span-2">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="mb-5 text-base font-semibold">Ticket Details</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label className={labelClass}>Title</label>
                                        <input readOnly className={fieldClass} value={ticket.title ?? ""} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Description</label>
                                        <textarea readOnly rows={4} className={`${fieldClass} resize-none`} value={ticket.description ?? ""} />
                                    </div>
                                </div>
                            </div>

                            <ChatThread ticketId={id} myId={user?._id ?? ""} fetchMessages={getMessages} />
                        </div>

                        {/* Right: status info */}
                        <div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="mb-5 text-base font-semibold">Ticket Info</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label className={labelClass}>Status</label>
                                        <input readOnly className={`${fieldClass} capitalize`} value={ticket.status ?? ""} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Priority</label>
                                        <input readOnly className={`${fieldClass} capitalize`} value={ticket.priority ?? ""} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Category</label>
                                        <input readOnly className={fieldClass} value={ticket.categoryId?.name ?? ""} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Assigned Agent</label>
                                        <input
                                            readOnly
                                            className={fieldClass}
                                            value={
                                                ticket.assignedAgentId
                                                    ? `${ticket.assignedAgentId.firstName ?? ""} ${ticket.assignedAgentId.lastName ?? ""}`
                                                    : "Not assigned yet"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
