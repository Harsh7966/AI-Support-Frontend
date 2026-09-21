"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UserDashboard() {
    const { user } = useSelector((state: RootState) => state.auth);

    const tickets = [
        {
            id: "#TKT-1024",
            title: "Unable to login to my account",
            status: "Open",
            priority: "High",
            date: "Today",
        },
        {
            id: "#TKT-1021",
            title: "Payment was deducted but order failed",
            status: "Resolved",
            priority: "Medium",
            date: "Sep 18",
        },
        {
            id: "#TKT-1018",
            title: "How can I update my profile?",
            status: "Open",
            priority: "Low",
            date: "Sep 16",
        },
        {
            id: "#TKT-1012",
            title: "Account verification issue",
            status: "Resolved",
            priority: "High",
            date: "Sep 12",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 lg:block">

                <div className="flex h-16 items-center border-b border-white/10 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 font-bold">
                            AI
                        </div>

                        <span className="text-lg font-bold">
                            SupportDesk
                        </span>
                    </div>
                </div>

                <nav className="space-y-1 p-4">

                    <Link
                        href="/user"
                        className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm font-medium text-blue-400"
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>

                    <Link
                        href="/user/tickets"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <span>▣</span>
                        My Tickets
                    </Link>

                    <Link
                        href="/user/create-ticket"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <span>＋</span>
                        Create Ticket
                    </Link>

                    <Link
                        href="/user/ai-assistant"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <span>✦</span>
                        AI Assistant
                    </Link>

                    <Link
                        href="/user/profile"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <span>◉</span>
                        Profile
                    </Link>

                </nav>

                <div className="absolute bottom-0 w-full border-t border-white/10 p-4">

                    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold">
                            {user?.email?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                {user?.email || "Customer"}
                            </p>

                            <p className="text-xs text-slate-500">
                                Customer
                            </p>
                        </div>

                    </div>

                </div>

            </aside>

            {/* Main */}
            <main className="lg:ml-64">

                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">

                    <div>
                        <h1 className="text-lg font-semibold">
                            Dashboard
                        </h1>

                        <p className="text-xs text-slate-500">
                            Manage your support requests
                        </p>
                    </div>

                    <div className="flex items-center gap-4">

                        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white">
                            🔔
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
                        </button>

                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium">
                                {user?.email || "Customer"}
                            </p>
                            <p className="text-xs text-slate-500">
                                Customer
                            </p>
                        </div>

                    </div>

                </header>

                <div className="p-6">

                    {/* Welcome */}
                    <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                        <div>
                            <h2 className="text-2xl font-bold">
                                Welcome back 👋
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Here's what's happening with your support tickets.
                            </p>
                        </div>

                        <Link
                            href="/user/create-ticket"
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-purple-500"
                        >
                            + Create Ticket
                        </Link>

                    </div>

                    {/* Stats */}
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                                    🎫
                                </div>

                                <span className="text-xs text-slate-500">
                                    Total
                                </span>
                            </div>

                            <p className="text-3xl font-bold">24</p>
                            <p className="mt-1 text-sm text-slate-400">
                                My Tickets
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-xl">
                                    🕐
                                </div>

                                <span className="text-xs text-yellow-400">
                                    Active
                                </span>
                            </div>

                            <p className="text-3xl font-bold">7</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Open Tickets
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-xl">
                                    ✓
                                </div>

                                <span className="text-xs text-green-400">
                                    Completed
                                </span>
                            </div>

                            <p className="text-3xl font-bold">17</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Resolved Tickets
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
                                    ✦
                                </div>

                                <span className="text-xs text-purple-400">
                                    AI
                                </span>
                            </div>

                            <p className="text-3xl font-bold">12</p>
                            <p className="mt-1 text-sm text-slate-400">
                                AI Conversations
                            </p>
                        </div>

                    </div>

                    {/* Content */}
                    <div className="mt-6 grid gap-6 xl:grid-cols-3">

                        {/* Tickets */}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 xl:col-span-2">

                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

                                <div>
                                    <h3 className="font-semibold">
                                        Recent Tickets
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Your latest support requests
                                    </p>
                                </div>

                                <Link
                                    href="/user/tickets"
                                    className="text-sm font-medium text-blue-400 hover:text-blue-300"
                                >
                                    View all
                                </Link>

                            </div>

                            <div className="divide-y divide-white/5">

                                {tickets.map((ticket) => (
                                    <Link
                                        href={`/user/tickets/${ticket.id.replace("#TKT-", "")}`}
                                        key={ticket.id}
                                        className="block px-5 py-4 transition hover:bg-white/[0.03]"
                                    >

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0">

                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-medium text-blue-400">
                                                        {ticket.id}
                                                    </span>

                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                                            ticket.status === "Open"
                                                                ? "bg-yellow-500/10 text-yellow-400"
                                                                : "bg-green-500/10 text-green-400"
                                                        }`}
                                                    >
                                                        {ticket.status}
                                                    </span>
                                                </div>

                                                <h4 className="mt-1 truncate text-sm font-medium text-white">
                                                    {ticket.title}
                                                </h4>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {ticket.date}
                                                </p>

                                            </div>

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

                        {/* AI Assistant */}
                        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent p-6">

                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

                            <div className="relative">

                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl shadow-lg">
                                    ✦
                                </div>

                                <h3 className="text-lg font-semibold">
                                    AI Knowledge Assistant
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Get instant answers from our knowledge
                                    base before creating a support ticket.
                                </p>

                                <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/60 p-3">

                                    <div className="flex gap-3">

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-sm">
                                            ✦
                                        </div>

                                        <div>
                                            <p className="text-xs leading-5 text-slate-300">
                                                How can I help you today?
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <Link
                                    href="/user/ai-assistant"
                                    className="mt-4 block rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-medium transition hover:bg-white/15"
                                >
                                    Ask AI Assistant →
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}