"use client"

import { Category, getAllCategory } from "@/services/customer/categoryService";
import { createTicket, Ticket } from "@/services/customer/ticketService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CreateTicketPage() {
    const [ticketDetail, setTicketDetail] = useState<Partial<Ticket>>({});
    const [category, setCategory] = useState<Category[]>([]);
    const router= useRouter();
    const hasFetched= useRef(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTicketDetail((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response= await createTicket(ticketDetail);
            if(response?.status){
                toast.success(response?.msg);
                router.push("/user/tickets");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                if(hasFetched.current) return;
                hasFetched.current= true;
                const response = await getAllCategory();
                if (response.status) {
                    setCategory(response?.data ?? []);
                } else {
                    toast.error(response?.msg);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchCategory();
    }, [])


    const inputClass =
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

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
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <span>▣</span>
                        My Tickets
                    </Link>

                    <Link
                        href="/user/create-ticket"
                        className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm font-medium text-blue-400"
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
                        <h1 className="text-lg font-semibold">Create Ticket</h1>
                        <p className="text-xs text-slate-500">Tell us what you need help with</p>
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
                        <span className="text-slate-300">Create Ticket</span>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-3">

                        {/* Form */}
                        <form className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 xl:col-span-2" onSubmit={handleSubmit}>

                            <div>
                                <h2 className="text-xl font-bold">New Support Ticket</h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Fill in the details below and our team will get back to you shortly.
                                </p>
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-300">
                                    Subject <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="Brief summary of your issue"
                                    className={inputClass}
                                    name="title"
                                    value={ticketDetail?.title ?? ""}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Category + Priority */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-300">
                                        Category <span className="text-red-400">*</span>
                                    </label>
                                    <select id="category" value={ticketDetail?.categoryId ?? ""} className={inputClass} name="categoryId" onChange={handleChange}>
                                        <option value="" disabled className="bg-slate-900">Select a category</option>
                                        {
                                            category.length > 0 && category.map((c, i) => {
                                                return (
                                                    <option className="bg-slate-900" key={i} value={c?._id}>{c?.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="priority" className="mb-2 block text-sm font-medium text-slate-300">
                                        Priority <span className="text-red-400">*</span>
                                    </label>
                                    <select id="priority" value={ticketDetail?.priority ?? "Medium"} className={inputClass} name="priority" onChange={handleChange}>
                                        <option className="bg-slate-900">Select Priority</option>
                                        <option className="bg-slate-900" value="low">Low</option>
                                        <option className="bg-slate-900" value="medium">Medium</option>
                                        <option className="bg-slate-900" value="high">High</option>
                                        <option className="bg-slate-900" value="urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-300">
                                    Description <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    rows={7}
                                    placeholder="Describe your issue in detail. Include any steps to reproduce, error messages, or relevant information."
                                    className={`${inputClass} resize-none`}
                                    name="description"
                                    value={ticketDetail?.description ?? ""}
                                    onChange={handleChange}
                                />
                                <p className="mt-2 text-xs text-slate-500">
                                    The more detail you share, the faster we can resolve it.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
                                <Link
                                    href="/user"
                                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-purple-500"
                                >
                                    Submit Ticket
                                </button>
                            </div>

                        </form>

                        {/* Side info */}
                        <div className="space-y-6">

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="mb-4 text-base font-semibold">Tips for a faster response</h3>

                                <ul className="space-y-4 text-sm text-slate-400">
                                    <li className="flex gap-3">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs text-blue-400">1</span>
                                        Use a clear, specific subject line.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs text-blue-400">2</span>
                                        Describe what you expected and what actually happened.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs text-blue-400">3</span>
                                        Attach screenshots or documents if they help.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs text-blue-400">4</span>
                                        Pick the priority that matches the urgency.
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="mb-4 text-base font-semibold">Priority guide</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
                                        <p className="text-slate-400">
                                            <span className="font-medium text-white">High</span> — service is down or blocked.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-500" />
                                        <p className="text-slate-400">
                                            <span className="font-medium text-white">Medium</span> — something isn&apos;t working right.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
                                        <p className="text-slate-400">
                                            <span className="font-medium text-white">Low</span> — general question or suggestion.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6">
                                <div className="mb-2 text-2xl">✦</div>
                                <h3 className="text-base font-semibold">Need a quick answer?</h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    Try our AI Assistant for instant help before creating a ticket.
                                </p>
                                <Link
                                    href="/user/ai-assistant"
                                    className="mt-4 inline-flex text-sm font-medium text-blue-400 hover:text-blue-300"
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
