"use client";

import { useRouter } from "next/navigation";
import Table, { TableColumn } from "@/component/Table";
import ActionButtons from "@/component/ActionButtons";
import { getAllTickets, Ticket } from "@/services/admin/ticketsService";
import { useEffect, useRef, useState } from "react";

export default function Tickets() {
    const router = useRouter();
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    const handleDelete= (id: string) =>{
        setTickets((prev)=>
            prev.filter((t)=>
                t._id !== id
            )
        )
    }

    useEffect(() => {
        const fetchAllTickets = async () => {
            try {
                if (hasFetched.current) return;
                hasFetched.current = true;
                const response = await getAllTickets();
                if (response?.status) setTickets(response?.data ?? []);
            } catch (err) {
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        fetchAllTickets();
    }, [])

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
            header: "Category",
            accessor: (row) => row.categoryId?.name ?? "",
        },
        {
            header: "Priority",
            accessor: "priority",
        },
        {
            header: "Status",
            accessor: "status",
        },
        {
            header: "Assigned Agent",
            accessor: (row) =>
                row.assignedAgentId
                    ? `${row.assignedAgentId.firstName ?? ""} ${row.assignedAgentId.lastName ?? ""}`
                    : "Not Assigned",
        },
    ];

    return (
        <div className="p-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
                Tickets
            </h2>

            <Table
                columns={columns}
                data={tickets}
                keyExtractor={(row) => row._id}
                loading={loading}
                actions={(row) => (
                    <ActionButtons
                        onEdit={() =>
                            router.push(`/admin/ticket/${row._id}`)
                        }
                        onDelete={() => handleDelete(row._id)}
                    />
                )}
            />
        </div>
    );
}
