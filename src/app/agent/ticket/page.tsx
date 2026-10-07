"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Table, { TableColumn } from "@/component/Table";
import ActionButtons from "@/component/ActionButtons";
import { getAllTickets, Ticket } from "@/services/agent/ticketService";
import { useEffect, useState } from "react";

const columns: TableColumn<Ticket>[] = [
    {
        header: "Customer Name",
        accessor: (row) =>
            `${row.customerId?.firstName ?? ""} ${row.customerId?.lastName ?? ""}`,
    },
    {
        header: "Email",
        accessor: (row) => row.customerId?.email ?? "",
    },
    {
        header: "Subject",
        accessor: "title",
    },
    {
        header: "Category",
        accessor: (row) => row.categoryId?.name ?? "",
    },
    {
        header: "Priority",
        accessor: "priority",
    },
    {
        header: "AI Priority",
        accessor: "aiPriority",
    },
    {
        header: "AI Summary",
        accessor: "aiSummary",
    },
    {
        header: "AI Category",
        accessor: "aiCategory",
    }
];

export default function AssignedTicketsPage() {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [tickets, setTickets]= useState<Ticket[]>([])

    useEffect(()=>{
        const fetchTickets= async()=>{
            try{
                const response= await getAllTickets();
                if(response?.status) setTickets(response?.data ?? []);
            }catch(err){
                console.log(err);
            }
        }
        fetchTickets()
    },[])

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
                        <h1 className="text-lg font-semibold">Assigned Tickets</h1>
                        <p className="text-xs text-slate-500">
                            Manage and resolve your assigned tickets
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:text-white"
                        >
                            🔔
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
                        </button>

                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium">{user?.email || "Agent"}</p>
                            <p className="text-xs text-slate-500">Support Agent</p>
                        </div>
                    </div>
                </header>

                <div className="p-6">

                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/agent" className="hover:text-white">Dashboard</Link>
                        <span>/</span>
                        <span className="text-slate-300">Assigned Tickets</span>
                    </div>

                    {/* Title */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">Assigned Tickets</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            View all the tickets assigned to you.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
                        <input
                            type="text"
                            placeholder="Search by customer or subject"
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
                            <option className="bg-slate-900">Closed</option>
                        </select>

                        <select
                            defaultValue=""
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="" className="bg-slate-900">All Priority</option>
                            <option className="bg-slate-900">Low</option>
                            <option className="bg-slate-900">Medium</option>
                            <option className="bg-slate-900">High</option>
                            <option className="bg-slate-900">Urgent</option>
                        </select>
                    </div>

                    {/* Common Table */}
                    <Table
                        columns={columns}
                        data={tickets}
                        keyExtractor={(row) => row._id}
                        emptyMessage="No tickets assigned to you"
                        actions={(row) => (
                            <ActionButtons
                                onView={() => router.push(`/agent/ticket/${row._id}`)}
                                onEdit={() => router.push(`/agent/ticket/${row._id}`)}
                            />
                        )}
                    />

                </div>

            </main>

        </div>
    );
}
