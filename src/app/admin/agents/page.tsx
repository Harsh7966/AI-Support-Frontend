"use client"

import ActionButtons from "@/component/ActionButtons";
import Table, { TableColumn } from "@/component/Table";
import { Agent, getAllAgent, updateAgent } from "@/services/agentService";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Agents() {
    const [loading, setLoading] = useState(true);
    const [agents, setAgent] = useState<Agent[]>([]);
    const router = useRouter();
    const hasFetched= useRef(false);

    const handleDelete = async (id: string) => {
        const data={isDeleted: true ,isActive: false};
        const response= await updateAgent(id, data);
        if(response.status){
            toast.success(response?.msg);
            setAgent((prev)=> 
                prev.filter((a)=> a._id !== id)
            )
        }else{
            toast.error(response?.msg);
        }
    }

    useEffect(() => {
        if(hasFetched.current) return;
        hasFetched.current= false;
        const fetchAgents = async () => {
            try {
                const response = await getAllAgent();
                if (response?.status) setAgent(response?.data ?? []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchAgents()
    }, [])

    const columns: TableColumn<Agent>[] = [
        { header: "Name", accessor: (row) => `${row?.firstName ?? ""} ${row?.lastName ?? ""}` },
        { header: "Email", accessor: "email" },
        { header: "Email Status", accessor: "isEmailVerified" },
        { header: "Phone", accessor: "phone" },
        { header: "Role", accessor: "role" },
        {
            header: "Status",
            accessor: (row) => (row.isActive ? "Active" : "Inactive"),
        }
    ];
    return (
        <>
            <div className="p-8">
                <div className="flex justify-between item-center mb-4">
                    <h2 className="mb-6 text-2xl font-bold text-slate-800">Agents</h2>
                    <button className="rounded-md border border-gray-400 px-6 text-gray-500" onClick={() => router.push("/admin/agents/create")}>+ Add Agent</button>
                </div>
                <Table
                    columns={columns}
                    data={agents}
                    keyExtractor={(row) => row._id}
                    loading={loading}
                    actions={(row) => (
                        <ActionButtons
                            onEdit={() => router.push(`/admin/agents/${row._id}`)}
                            onDelete={() => handleDelete(row._id)}
                        />
                    )}
                />
            </div>
        </>
    )
}