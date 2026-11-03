"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTickets, Ticket } from "@/services/admin/ticketsService";
import { getAllCustomers } from "@/services/admin/customerService";
import { getAllAgent } from "@/services/admin/agentService";

const statusStyle: Record<string, string> = {
    open: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-purple-100 text-purple-700",
    resolved: "bg-green-100 text-green-700",
    closed: "bg-slate-100 text-slate-600",
};

const priorityStyle: Record<string, string> = {
    urgent: "bg-red-200 text-red-800",
    high: "bg-red-100 text-red-700",
    medium: "bg-orange-100 text-orange-700",
    low: "bg-slate-100 text-slate-600",
};

const fullName = (u?: { firstName?: string; lastName?: string; email?: string } | null) =>
    u ? [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email || "-" : "Unassigned";

const timeAgo = (date?: string) => {
    if (!date) return "";
    const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
};

export default function AdminHomePage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [customerCount, setCustomerCount] = useState(0);
    const [agentCount, setAgentCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [t, c, a] = await Promise.all([
                    getAllTickets(),
                    getAllCustomers(),
                    getAllAgent(),
                ]);
                setTickets(t?.data ?? []);
                setCustomerCount(c?.data?.length ?? 0);
                setAgentCount(a?.data?.length ?? 0);
            } catch (error) {
                console.error("Failed to load dashboard", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const countByStatus = (s: string) => tickets.filter((t) => t.status === s).length;

    const stats = [
        { label: "Total Customers", value: customerCount, color: "text-slate-800" },
        { label: "Total Agents", value: agentCount, color: "text-slate-800" },
        { label: "Total Tickets", value: tickets.length, color: "text-slate-800" },
        { label: "Open Tickets", value: countByStatus("open"), color: "text-orange-600" },
        { label: "Pending Tickets", value: countByStatus("pending"), color: "text-yellow-600" },
        { label: "Resolved Tickets", value: countByStatus("resolved"), color: "text-green-600" },
    ];

    const recentTickets = [...tickets]
        .sort(
            (a, b) =>
                new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
        )
        .slice(0, 5);

    return (
        <div className="p-8">
            {/* Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm text-slate-500">{s.label}</p>
                        <p className={`mt-2 text-3xl font-bold ${s.color}`}>
                            {loading ? "-" : s.value.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Tickets */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h3 className="font-semibold text-slate-800">Recent Tickets</h3>
                        <p className="text-xs text-slate-500">Latest customer support activity</p>
                    </div>

                    <Link
                        href="/admin/ticket"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        View All
                    </Link>
                </div>

                <div className="divide-y divide-slate-100">
                    {loading ? (
                        <p className="px-6 py-8 text-center text-sm text-slate-400">Loading...</p>
                    ) : recentTickets.length === 0 ? (
                        <p className="px-6 py-8 text-center text-sm text-slate-400">
                            No tickets found
                        </p>
                    ) : (
                        recentTickets.map((ticket) => (
                            <Link
                                href={`/admin/ticket/${ticket._id}`}
                                key={ticket._id}
                                className="block px-6 py-4 transition hover:bg-slate-50"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-semibold text-indigo-600">
                                                #{ticket._id.slice(-6).toUpperCase()}
                                            </span>
                                            <span
                                                className={`rounded-full px-2 py-1 text-[10px] font-medium capitalize ${
                                                    statusStyle[ticket.status] ?? "bg-slate-100 text-slate-600"
                                                }`}
                                            >
                                                {ticket.status}
                                            </span>
                                        </div>

                                        <h4 className="mt-1 truncate text-sm font-medium text-slate-800">
                                            {ticket.title}
                                        </h4>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Customer: {fullName(ticket.customerId)} • Agent:{" "}
                                            {fullName(ticket.assignedAgentId)}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <span
                                            className={`rounded-full px-2 py-1 text-[10px] font-medium capitalize ${
                                                priorityStyle[ticket.priority] ?? "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {ticket.priority}
                                        </span>
                                        <p className="mt-2 text-xs text-slate-400">
                                            {timeAgo(ticket.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
