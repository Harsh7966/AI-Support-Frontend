"use client";

import Link from "next/link";
import ActionButtons from "@/component/ActionButtons";
import Table, { TableColumn } from "@/component/Table";
import { myTickets, Ticket } from "@/services/customer/ticketService";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const priorityStyle: Record<Ticket["priority"], string> = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-700",
    Low: "bg-green-50 text-green-600",
};

const statusStyle: Record<Ticket["status"], string> = {
    Open: "bg-blue-50 text-blue-600",
    "In Progress": "bg-purple-50 text-purple-600",
    Resolved: "bg-green-50 text-green-600",
};

const columns: TableColumn<Ticket>[] = [
    {
        header: "Subject",
        accessor: "title",
    },

    {
        header: "Category",
        accessor: (row) => typeof row.categoryId === "object" ? row.categoryId?.name ?? "-" : "-",
    },

    {
        header: "Priority",
        accessor: (row) => (
            <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyle[row.priority]
                    }`}
            >
                {row.priority}
            </span>
        ),
    },

    {
        header: "Status",
        accessor: (row) => (
            <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[row.status]
                    }`}
            >
                {row.status}
            </span>
        ),
    },

    {
        header: "Created",
        accessor: (row) =>
            new Date(row.createdAt).toLocaleDateString(),
    },
];

export default function MyTicketsPage() {
    const router = useRouter();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchAllTickets = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;
            const response = await myTickets();
            if (response?.status) setTickets(response?.data ?? []);
        }
        fetchAllTickets();
    }, [])

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
                    <Link
                        href="/user"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>

                    <Link
                        href="/user/tickets"
                        className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm font-medium text-blue-400"
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
                            C
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">Customer</p>
                            <p className="text-xs text-slate-500">Customer</p>
                        </div>
                    </div>
                </div>

            </aside>

            {/* Main */}
            <main className="lg:ml-64">

                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">
                    <div>
                        <h1 className="text-lg font-semibold">My Tickets</h1>
                        <p className="text-xs text-slate-500">Track all your support requests</p>
                    </div>

                    <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white">
                        🔔
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
                    </button>
                </header>

                <div className="p-6">

                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/user" className="hover:text-white">Dashboard</Link>
                        <span>/</span>
                        <span className="text-slate-300">My Tickets</span>
                    </div>

                    {/* Title + action */}
                    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold">My Tickets</h2>
                            <p className="mt-1 text-sm text-slate-400">
                                View and manage all the tickets you have created.
                            </p>
                        </div>

                        <Link
                            href="/user/create-ticket"
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-purple-500"
                        >
                            + Create Ticket
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                        <input
                            type="text"
                            placeholder="Search by ticket ID or subject"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />

                        <select
                            defaultValue=""
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="" className="bg-slate-900">All Status</option>
                            <option className="bg-slate-900">Open</option>
                            <option className="bg-slate-900">In Progress</option>
                            <option className="bg-slate-900">Resolved</option>
                        </select>

                        <select
                            defaultValue=""
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="" className="bg-slate-900">All Priority</option>
                            <option className="bg-slate-900">High</option>
                            <option className="bg-slate-900">Medium</option>
                            <option className="bg-slate-900">Low</option>
                        </select>
                    </div>

                    {/* Common Table */}
                    <Table
                        columns={columns}
                        data={tickets}
                        keyExtractor={(row) => row._id}
                        emptyMessage="You haven't created any tickets yet"
                        actions={(row) => <ActionButtons onView={() => router.push(`/user/tickets/${row._id}`)} />}
                    />

                </div>

            </main>

        </div>
    );
}
