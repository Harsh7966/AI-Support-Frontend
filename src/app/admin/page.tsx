"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const tickets = [
    {
        id: "#TKT-1042",
        title: "Unable to login to my account",
        customer: "Rahul Sharma",
        agent: "Amit Verma",
        status: "Open",
        priority: "High",
        time: "10 min ago",
    },
    {
        id: "#TKT-1039",
        title: "Payment deducted but order failed",
        customer: "Priya Singh",
        agent: "Neha Gupta",
        status: "Pending",
        priority: "High",
        time: "35 min ago",
    },
    {
        id: "#TKT-1035",
        title: "Unable to update profile information",
        customer: "Amit Kumar",
        agent: "Rahul Mehta",
        status: "Open",
        priority: "Medium",
        time: "1 hour ago",
    },
    {
        id: "#TKT-1028",
        title: "Account verification problem",
        customer: "Neha Gupta",
        agent: "Amit Verma",
        status: "Resolved",
        priority: "Low",
        time: "3 hours ago",
    },
];

const agents = [
    {
        name: "Amit Verma",
        email: "amit@example.com",
        assigned: 18,
        resolved: 14,
        status: "Online",
    },
    {
        name: "Neha Gupta",
        email: "neha@example.com",
        assigned: 15,
        resolved: 11,
        status: "Online",
    },
    {
        name: "Rahul Mehta",
        email: "rahul@example.com",
        assigned: 12,
        resolved: 9,
        status: "Offline",
    },
];

export default function AdminHomePage() {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white">

                {/* Logo */}
                <div className="flex h-16 items-center border-b border-slate-200 px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                            S
                        </div>

                        <span className="text-xl font-bold text-slate-800">
                            SupportDesk
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 p-4">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Main
                    </p>

                    <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2.5 text-sm font-medium text-indigo-600"
                    >
                        <span>📊</span>
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/tickets"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>🎫</span>
                        Tickets
                    </Link>

                    <Link
                        href="/admin/assignment"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>🔄</span>
                        Assignment
                    </Link>

                    <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Management
                    </p>

                    <Link
                        href="/admin/customers"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>👥</span>
                        Customers
                    </Link>

                    <Link
                        href="/admin/agents"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>🧑‍💼</span>
                        Agents
                    </Link>

                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>🏷️</span>
                        Categories
                    </Link>

                    <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        AI & Knowledge
                    </p>

                    <Link
                        href="/admin/knowledge-base"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>📚</span>
                        Knowledge Base
                    </Link>

                    <Link
                        href="/admin/ai-monitoring"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>🤖</span>
                        AI Monitoring
                    </Link>

                    <Link
                        href="/admin/ai-settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>⚙️</span>
                        AI Settings
                    </Link>

                    <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Account
                    </p>

                    <Link
                        href="/admin/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <span>👤</span>
                        Profile
                    </Link>

                </nav>

            </aside>

            {/* Main Content */}
            <main className="ml-64">

                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">

                    <div>
                        <h1 className="text-lg font-semibold text-slate-800">
                            Admin Dashboard
                        </h1>

                        <p className="text-xs text-slate-500">
                            Manage your support system
                        </p>
                    </div>

                    <div className="flex items-center gap-5">

                        {/* Notification */}
                        <button className="relative text-xl">
                            🔔

                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                4
                            </span>
                        </button>

                        {/* Admin */}
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                                {user?.email?.charAt(0).toUpperCase() || "A"}
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    {user?.email || "Admin"}
                                </p>

                                <p className="text-xs capitalize text-slate-400">
                                    {user?.role || "admin"}
                                </p>
                            </div>

                        </div>

                    </div>

                </header>

                {/* Dashboard */}
                <div className="p-8">

                    {/* Welcome */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800">
                            Welcome back, Admin 👋
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Here's what's happening in your support system today.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Customers */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Customers
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                                        1,248
                                    </h3>
                                </div>

                                <div className="rounded-lg bg-blue-100 p-3 text-xl">
                                    👥
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-green-600">
                                ↑ 12.5% from last month
                            </p>
                        </div>

                        {/* Agents */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Agents
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                                        32
                                    </h3>
                                </div>

                                <div className="rounded-lg bg-purple-100 p-3 text-xl">
                                    🧑‍💼
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-green-600">
                                26 agents currently active
                            </p>
                        </div>

                        {/* Tickets */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Tickets
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                                        2,846
                                    </h3>
                                </div>

                                <div className="rounded-lg bg-orange-100 p-3 text-xl">
                                    🎫
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-500">
                                184 open tickets
                            </p>
                        </div>

                        {/* Resolved */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Resolved Tickets
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                                        2,412
                                    </h3>
                                </div>

                                <div className="rounded-lg bg-green-100 p-3 text-xl">
                                    ✅
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-green-600">
                                84.7% resolution rate
                            </p>
                        </div>

                    </div>

                    {/* Second Statistics */}
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                            <p className="text-sm text-slate-500">
                                Open Tickets
                            </p>

                            <p className="mt-2 text-2xl font-bold text-orange-600">
                                184
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                            <p className="text-sm text-slate-500">
                                Pending Tickets
                            </p>

                            <p className="mt-2 text-2xl font-bold text-yellow-600">
                                96
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                            <p className="text-sm text-slate-500">
                                AI Conversations
                            </p>

                            <p className="mt-2 text-2xl font-bold text-indigo-600">
                                3,482
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                            <p className="text-sm text-slate-500">
                                Knowledge Documents
                            </p>

                            <p className="mt-2 text-2xl font-bold text-purple-600">
                                126
                            </p>
                        </div>

                    </div>

                    {/* Main Grid */}
                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

                        {/* Recent Tickets */}
                        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white">

                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Recent Tickets
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        Latest customer support activity
                                    </p>
                                </div>

                                <Link
                                    href="/admin/tickets"
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                >
                                    View All
                                </Link>

                            </div>

                            <div className="divide-y divide-slate-100">

                                {tickets.map((ticket) => (

                                    <Link
                                        href={`/admin/tickets/${ticket.id.replace("#TKT-", "")}`}
                                        key={ticket.id}
                                        className="block px-6 py-4 transition hover:bg-slate-50"
                                    >

                                        <div className="flex items-center justify-between gap-4">

                                            <div className="min-w-0">

                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-semibold text-indigo-600">
                                                        {ticket.id}
                                                    </span>

                                                    <span
                                                        className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                                                            ticket.status === "Open"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : ticket.status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-green-100 text-green-700"
                                                        }`}
                                                    >
                                                        {ticket.status}
                                                    </span>
                                                </div>

                                                <h4 className="mt-1 truncate text-sm font-medium text-slate-800">
                                                    {ticket.title}
                                                </h4>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Customer: {ticket.customer} • Agent: {ticket.agent}
                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <span
                                                    className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                                                        ticket.priority === "High"
                                                            ? "bg-red-100 text-red-700"
                                                            : ticket.priority === "Medium"
                                                            ? "bg-orange-100 text-orange-700"
                                                            : "bg-slate-100 text-slate-600"
                                                    }`}
                                                >
                                                    {ticket.priority}
                                                </span>

                                                <p className="mt-2 text-xs text-slate-400">
                                                    {ticket.time}
                                                </p>

                                            </div>

                                        </div>

                                    </Link>

                                ))}

                            </div>

                        </div>

                        {/* Agent Performance */}
                        <div className="rounded-xl border border-slate-200 bg-white">

                            <div className="border-b border-slate-200 px-6 py-4">
                                <h3 className="font-semibold text-slate-800">
                                    Agent Performance
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Current workload
                                </p>
                            </div>

                            <div className="divide-y divide-slate-100">

                                {agents.map((agent) => (

                                    <div
                                        key={agent.email}
                                        className="px-6 py-5"
                                    >

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                                                    {agent.name.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">
                                                        {agent.name}
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        {agent.email}
                                                    </p>
                                                </div>

                                            </div>

                                            <span
                                                className={`text-xs font-medium ${
                                                    agent.status === "Online"
                                                        ? "text-green-600"
                                                        : "text-slate-400"
                                                }`}
                                            >
                                                ● {agent.status}
                                            </span>

                                        </div>

                                        <div className="mt-4 flex justify-between text-xs text-slate-500">
                                            <span>
                                                Assigned: {agent.assigned}
                                            </span>

                                            <span>
                                                Resolved: {agent.resolved}
                                            </span>
                                        </div>

                                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-indigo-500"
                                                style={{
                                                    width: `${(agent.resolved / agent.assigned) * 100}%`,
                                                }}
                                            />
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                    {/* Bottom Section */}
                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Ticket Assignment */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6">

                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 p-3 text-xl">
                                    🔄
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Ticket Assignment
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        Manage agent assignments
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-3">

                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">
                                        Unassigned
                                    </span>

                                    <span className="font-semibold text-red-600">
                                        24
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">
                                        Assigned Today
                                    </span>

                                    <span className="font-semibold text-slate-800">
                                        67
                                    </span>
                                </div>

                            </div>

                            <Link
                                href="/admin/assignment"
                                className="mt-5 block rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Manage Assignment
                            </Link>

                        </div>

                        {/* Knowledge Base */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6">

                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 p-3 text-xl">
                                    📚
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        Knowledge Base
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        AI knowledge documents
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">

                                <p className="text-3xl font-bold text-slate-800">
                                    126
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Documents available for AI
                                </p>

                            </div>

                            <Link
                                href="/admin/knowledge-base"
                                className="mt-5 block rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Manage Documents
                            </Link>

                        </div>

                        {/* AI Monitoring */}
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-6">

                            <div className="flex items-center gap-3">

                                <div className="rounded-lg bg-indigo-600 p-3 text-xl">
                                    🤖
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        AI Monitoring
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        AI system activity
                                    </p>
                                </div>

                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">

                                <div className="rounded-lg bg-white p-3">
                                    <p className="text-xs text-slate-500">
                                        AI Requests
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-800">
                                        3,482
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-3">
                                    <p className="text-xs text-slate-500">
                                        Success Rate
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-green-600">
                                        96.8%
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-3">
                                    <p className="text-xs text-slate-500">
                                        Avg Response
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-800">
                                        1.8s
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-3">
                                    <p className="text-xs text-slate-500">
                                        Documents Used
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-indigo-600">
                                        2,941
                                    </p>
                                </div>

                            </div>

                            <Link
                                href="/admin/ai-monitoring"
                                className="mt-5 block rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                View AI Monitoring
                            </Link>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}
