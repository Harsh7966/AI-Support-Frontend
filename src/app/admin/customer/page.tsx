"use client";

import Table, { TableColumn } from "@/component/Table";
import { useEffect, useState } from "react";
import { Customer, getAllCustomers } from "../../../services/customerService"
import { toast } from "react-toastify";

export default function Customer() {
    const [customer, setCustomer] = useState<Customer[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getAllCustomers();
                console.log(response, "aedjojef");
                if (response?.status) {
                    setCustomer(response?.data);
                    toast.success(response?.msg);
                } else {
                    toast.error(response?.msg);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchCustomers();
    }, [])

    const columns: TableColumn<Customer>[] = [
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
            <main className="min-h-screen bg-slate-950 px-6 py-10">
                <h1 className="mb-6 text-2xl font-bold text-white">Customers</h1>
                <Table
                    columns={columns}
                    data={customer}
                    keyExtractor={(row) => row._id}
                    loading={loading}
                />
            </main>
        </>
    )
}