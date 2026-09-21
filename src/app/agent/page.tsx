"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AgentDashboard() {
    const { user } = useSelector((state: RootState) => state.auth);

    const tickets = [
        {
            id: "#TKT-1042",
            title: "Unable to login to my account",
            customer: "Rahul Sharma",
            status: "Open",
            priority: "High",
            time: "10 min ago",
        },
        {
            id: "#TKT-1039",
            title: "Payment deducted but order failed",
            customer: "Priya Singh",
            status: "Pending",
            priority: "High",
            time: "35 min ago",
        },
        {
            id: "#TKT-1035",
            title: "Unable to update profile information",
            customer: "Amit Verma",
            status: "Open",
            priority: "Medium",
            time: "1 hour ago",
        },
        {
            id: "#TKT-1028",
            title: "Account verification problem",
            customer: "Neha Gupta",
            status: "Resolved",
            priority: "Low",
            time: "3 hours ago",
        },
        {
            id: "#TKT-1024",
            title: "Password reset request",
            customer: "Rohit Kumar",
            status: "Resolved",
            priority: "Medium",
            time: "Yesterday",
        },
    ];

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
                        href="/agent/tickets"
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
                                18
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
                                6
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
                                4
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
                                8
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Resolved Tickets
                            </p>

                        </div>

                    </div>

                    {/* ================= CONTENT ================= */}

                    <div className="mt-6 grid gap-6 xl:grid-cols-3">

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
                                    href="/agent/tickets"
                                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                                >
                                    View all
                                </Link>

                            </div>

                            <div className="divide-y divide-white/5">

                                {tickets.map((ticket) => (

                                    <Link
                                        key={ticket.id}
                                        href={`/agent/tickets/${ticket.id.replace("#TKT-", "")}`}
                                        className="block px-5 py-4 transition hover:bg-white/[0.03]"
                                    >

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0">

                                                {/* Ticket ID + Status */}
                                                <div className="flex flex-wrap items-center gap-2">

                                                    <span className="text-xs font-medium text-blue-400">
                                                        {ticket.id}
                                                    </span>

                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                                            ticket.status === "Open"
                                                                ? "bg-yellow-500/10 text-yellow-400"
                                                                : ticket.status === "Pending"
                                                                ? "bg-orange-500/10 text-orange-400"
                                                                : "bg-green-500/10 text-green-400"
                                                        }`}
                                                    >
                                                        {ticket.status}
                                                    </span>

                                                </div>

                                                {/* Title */}
                                                <h4 className="mt-1 truncate text-sm font-medium text-white">
                                                    {ticket.title}
                                                </h4>

                                                {/* Customer */}
                                                <div className="mt-2 flex items-center gap-2">

                                                    <span className="text-xs text-slate-500">
                                                        Customer:
                                                    </span>

                                                    <span className="text-xs text-slate-300">
                                                        {ticket.customer}
                                                    </span>

                                                </div>

                                                <p className="mt-1 text-xs text-slate-600">
                                                    {ticket.time}
                                                </p>

                                            </div>

                                            {/* Priority */}
                                            <span
                                                className={`shrink-0 rounded-lg px-2 py-1 text-[10px] font-medium ${
                                                    ticket.priority === "High"
                                                        ? "bg-red-500/10 text-red-400"
                                                        : ticket.priority === "Medium"
                                                        ? "bg-orange-500/10 text-orange-400"
                                                        : "bg-slate-500/10 text-slate-400"
                                                }`}
                                            >
                                                {ticket.priority}
                                            </span>

                                        </div>

                                    </Link>

                                ))}

                            </div>

                        </div>

                        {/* ================= AI PANEL ================= */}

                        <div className="space-y-6">

                            {/* AI Summary */}
                            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent p-6">

                                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

                                <div className="relative">

                                    <div className="mb-4 flex items-center justify-between">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl">
                                            ✦
                                        </div>

                                        <span className="rounded-full bg-purple-500/10 px-2 py-1 text-[10px] font-medium text-purple-400">
                                            AI
                                        </span>

                                    </div>

                                    <h3 className="font-semibold">
                                        AI Ticket Summary
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        AI can summarize long customer conversations
                                        so you can understand the issue quickly.
                                    </p>

                                    <Link
                                        href="/agent/tickets/1042"
                                        className="mt-4 block rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-medium transition hover:bg-white/15"
                                    >
                                        View AI Summary →
                                    </Link>

                                </div>

                            </div>

                            {/* AI Suggested Reply */}
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                <div className="mb-4 flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                                        💡
                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            AI Suggested Reply
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            For #TKT-1042
                                        </p>

                                    </div>

                                </div>

                                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">

                                    <p className="text-sm leading-6 text-slate-400">
                                        "We're sorry you're experiencing login
                                        issues. Please try resetting your password
                                        using the forgot password option. If the
                                        issue continues, we'll be happy to assist."
                                    </p>

                                </div>

                                <div className="mt-4 flex gap-2">

                                    <button
                                        type="button"
                                        className="flex-1 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold transition hover:bg-blue-500"
                                    >
                                        Use Reply
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-slate-400 transition hover:text-white"
                                    >
                                        Regenerate
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ================= QUICK ACTIONS ================= */}

                    <div className="mt-6">

                        <h3 className="mb-4 text-sm font-semibold">
                            Quick Actions
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <Link
                                href="/agent/tickets"
                                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                            >

                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                                    🎫
                                </div>

                                <h4 className="text-sm font-semibold">
                                    View Tickets
                                </h4>

                                <p className="mt-1 text-xs text-slate-500">
                                    Manage assigned tickets
                                </p>

                            </Link>

                            <Link
                                href="/agent/tickets/1042"
                                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                            >

                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                                    💬
                                </div>

                                <h4 className="text-sm font-semibold">
                                    Continue Conversation
                                </h4>

                                <p className="mt-1 text-xs text-slate-500">
                                    Reply to customers
                                </p>

                            </Link>

                            <Link
                                href="/agent/tickets/1042"
                                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                            >

                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                                    ✦
                                </div>

                                <h4 className="text-sm font-semibold">
                                    AI Assistance
                                </h4>

                                <p className="mt-1 text-xs text-slate-500">
                                    Summary & suggested replies
                                </p>

                            </Link>

                            <Link
                                href="/agent/profile"
                                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                            >

                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                                    ⚙
                                </div>

                                <h4 className="text-sm font-semibold">
                                    Profile
                                </h4>

                                <p className="mt-1 text-xs text-slate-500">
                                    Manage your account
                                </p>

                            </Link>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}