"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { agentDashboardData, AssignTicket } from "@/services/agent/ticketService";

export default function AgentDashboard() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [tickets, setTickets] = useState<AssignTicket[]>([])
    const [open, setOpen] = useState<number>();
    const [pending, setPending] = useState<number>();
    const [resolved, setResolved] = useState<number>();
    const [total, setTotal] = useState<number>();
    useEffect(() => {
        const fetchAgentDashboardRecord = async () => {
            try {
                const response = await agentDashboardData();
                console.log(response, "API response");
                if (response?.status) {
                    setTickets(response?.tickets);
                    setOpen(response?.open);
                    setPending(response?.pending);
                    setResolved(response?.resolved);
                    setTotal(response?.total);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchAgentDashboardRecord();
    }, [])

    console.log(tickets, "UUUUUUUUUU");

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* ================= SIDEBAR ================= */}

            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 lg:block">

                {/* Logo */}
                <div className="flex h-16 items-center border-b border-white/10 px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold">
                            AI
                        </div>

                        <span className="text-lg font-bold">
                            SupportDesk
                        </span>

                    </div>

                </div>

                {/* Navigation */}
                <nav className="space-y-1 p-4">

                    <Link
                        href="/agent"
                        className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm font-medium text-blue-400"
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>

                    <Link
                        href="/agent/ticket"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
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

                {/* Agent Profile */}
                <div className="absolute bottom-0 w-full border-t border-white/10 p-4">

                    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold">
                            {user?.email?.charAt(0).toUpperCase() || "A"}
                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-sm font-medium text-white">
                                {user?.email || "Agent"}
                            </p>

                            <p className="text-xs text-blue-400">
                                Support Agent
                            </p>

                        </div>

                    </div>

                </div>

            </aside>

            {/* ================= MAIN ================= */}

            <main className="lg:ml-64">

                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">

                    <div>

                        <h1 className="text-lg font-semibold">
                            Agent Dashboard
                        </h1>

                        <p className="text-xs text-slate-500">
                            Manage and resolve your assigned tickets
                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        {/* Notification */}
                        <button
                            type="button"
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:text-white"
                        >
                            🔔

                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
                        </button>

                        {/* Agent */}
                        <div className="hidden text-right sm:block">

                            <p className="text-sm font-medium">
                                {user?.email || "Agent"}
                            </p>

                            <p className="text-xs text-slate-500">
                                Support Agent
                            </p>

                        </div>

                    </div>

                </header>

                {/* Page Content */}
                <div className="p-6">

                    {/* Welcome */}
                    <div className="mb-7">

                        <h2 className="text-2xl font-bold">
                            Welcome back, Agent 👋
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Here is an overview of your assigned support tickets.
                        </p>

                    </div>

                    {/* ================= STATS ================= */}

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Assigned */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                            <div className="mb-4 flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                                    🎫
                                </div>

                                <span className="text-xs text-blue-400">
                                    Assigned
                                </span>

                            </div>

                            <p className="text-3xl font-bold">
                                {total }
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Total Assigned
                            </p>

                        </div>

                        {/* Open */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                            <div className="mb-4 flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-xl">
                                    🕐
                                </div>

                                <span className="text-xs text-yellow-400">
                                    Active
                                </span>

                            </div>

                            <p className="text-3xl font-bold">
                                {open}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Open Tickets
                            </p>

                        </div>

                        {/* Pending */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                            <div className="mb-4 flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-xl">
                                    ⚠
                                </div>

                                <span className="text-xs text-orange-400">
                                    Waiting
                                </span>

                            </div>

                            <p className="text-3xl font-bold">
                                {pending}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Pending Tickets
                            </p>

                        </div>

                        {/* Resolved */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                            <div className="mb-4 flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-xl">
                                    ✓
                                </div>

                                <span className="text-xs text-green-400">
                                    Completed
                                </span>

                            </div>

                            <p className="text-3xl font-bold">
                                {resolved}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Resolved Tickets
                            </p>

                        </div>

                    </div>

                    {/* ================= CONTENT ================= */}

                    <div className="mt-6 w-full">

                        {/* Assigned Tickets */}

                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 xl:col-span-2">

                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

                                <div>

                                    <h3 className="font-semibold">
                                        Assigned Tickets
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Tickets currently assigned to you
                                    </p>

                                </div>

                                <Link
                                    href="/agent/ticket"
                                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                                >
                                    View all
                                </Link>

                            </div>

                            <div className="divide-y divide-white/5">

                                {tickets.map((t: any) => (

                                    <Link
                                        key={t._id}
                                        href={`/agent/tickets/${t._id}`}
                                        className="block px-5 py-4 transition hover:bg-white/[0.03]"
                                    >

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0">

                                                {/* Ticket ID + Status */}
                                                <div className="flex flex-wrap items-center gap-2">

                                                    <span className="text-xs font-medium text-blue-400">
                                                        {t._id}
                                                    </span>

                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${t.status === "open"
                                                                ? "bg-yellow-500/10 text-yellow-400"
                                                                : t.status === "pending"
                                                                    ? "bg-orange-500/10 text-orange-400"
                                                                    : "bg-green-500/10 text-green-400"
                                                            }`}
                                                    >
                                                        {t.status}
                                                    </span>

                                                </div>

                                                {/* Title */}
                                                <h4 className="mt-1 truncate text-sm font-medium text-white">
                                                    {t.title}
                                                </h4>

                                                {/* Customer */}
                                                <div className="mt-2 flex items-center gap-2">

                                                    <span className="text-xs text-slate-500">
                                                        Customer:
                                                    </span>

                                                    <span className="text-xs text-slate-300">
                                                        {`${t.customerId.firstName} ${t.customerId.lastName}`}
                                                    </span>

                                                </div>

                                                <p className="mt-1 text-xs text-slate-600">
                                                    {new Date(t.createdAt).toLocaleDateString("en-GB")}
                                                </p>

                                            </div>

                                            {/* Priority */}
                                            <span
                                                className={`shrink-0 rounded-lg px-2 py-1 text-[10px] font-medium ${t.priority === "high"
                                                        ? "bg-red-500/10 text-red-400"
                                                        : t.priority === "medium"
                                                            ? "bg-orange-500/10 text-orange-400"
                                                            : "bg-slate-500/10 text-slate-400"
                                                    }`}
                                            >
                                                {t.priority}
                                            </span>

                                        </div>

                                    </Link>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}