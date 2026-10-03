"use client"

import { Agent, getAllAgent } from "@/services/admin/agentService";
import { Category, getAllCategory } from "@/services/admin/categoryService";
import { getTicketDetails, Ticket, upadteTicketDetails } from "@/services/admin/ticketsService";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function UpdateTicket() {
    const router= useRouter();
    const params = useParams();
    const id = params.id as string;
    const [ticketDetails, setTicketDetails] = useState<Partial<Ticket>>({});
    const [category, setCategory] = useState<Category[]>([]);
    const [agents, setAgents] = useState<Agent[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "assignedAgentId") {
            const selectedAgent = agents.find((a) => a?._id == value);
            setTicketDetails((prev) => ({
                ...prev,
                [name]: selectedAgent ?? null
            }))
            return;
        }

        setTicketDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const finalPayload = {
                assignedAgentId: ticketDetails.assignedAgentId?._id ?? null,
                categoryId: ticketDetails.categoryId?._id,
                priority: ticketDetails.priority,
                status: ticketDetails.status,
            }
            const response= await upadteTicketDetails(finalPayload, id);
            if(response?.status){
                toast.success(response?.msg);
                router.push("/admin/ticket");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await getTicketDetails(id);
                if (response?.status && response?.data) {
                    setTicketDetails(response?.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchTicketDetails();
    }, [id])

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const response = await getAllCategory();
                if (response?.status && response?.data) {
                    setCategory(response?.data ?? []);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchCategoryList();
    }, [])

    useEffect(() => {
        const fetchAgentList = async () => {
            try {
                const response = await getAllAgent();
                if (response?.status && response?.data) {
                    setAgents(response?.data ?? []);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchAgentList();
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-3xl">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Update Ticket</h1>
                            <p className="text-sm text-gray-500">Ticket ID: {ticketDetails?._id}</p>
                        </div>
                        <a
                            href="/admin/ticket"
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            ← Back to Tickets
                        </a>
                    </div>

                    {/* Form Card */}
                    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        {/* Customer (read only) */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Customer Name</label>
                                <input
                                    type="text"
                                    value={`${ticketDetails?.customerId?.firstName} ${ticketDetails?.customerId?.lastName}`}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Customer Email</label>
                                <input
                                    type="email"
                                    value={ticketDetails?.customerId?.email}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                placeholder="Enter ticket title"
                                value={ticketDetails?.title}
                                disabled
                                className="w-full rounded-lg cursor-not-allowed border bg-gray-100 border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows={5}
                                placeholder="Describe the issue..."
                                disabled
                                value={ticketDetails?.description}
                                className="w-full rounded-lg cursor-not-allowed border bg-gray-100 border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Category / Priority / Status */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                                <select name="categoryId" value={ticketDetails?.categoryId?._id} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                    <option>Select category</option>
                                    {
                                        category.map((c, i) => { return (<option value={c?._id} key={i}>{c?.name}</option>) }
                                        )
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Priority</label>
                                <select name="priority" value={ticketDetails?.priority} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                                <select name="status" value={ticketDetails?.status} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                    <option value="open">Open</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        {/* Assign Agent */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Assign Agent</label>
                            <select name="assignedAgentId" value={ticketDetails?.assignedAgentId?._id ?? ""} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                <option value="">Unassigned</option>
                                {
                                    agents.map((a, i) => {
                                        return (<option value={a?._id} key={i}>{`${a?.firstName} ${a?.lastName}`}</option>)
                                    })
                                }
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                            <Link
                                href="/admin/ticket"
                                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Update Ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}