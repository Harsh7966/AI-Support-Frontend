"use client";

import Table, { TableColumn } from "@/component/Table";
import ActionButtons from "@/component/ActionButtons";
import { useEffect, useRef, useState } from "react";
import { Customer, getAllCustomers } from "../../../services/customerService"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CustomerPage() {
    const router = useRouter();
    const [customer, setCustomer] = useState<Customer[]>([])
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    // const handleDelete = async(id:string) =>{
    //     try{
    //         setCustomer((prev)=>{
    //             ...prev,
    //             [name]:value
    //         })
    //         const response= await updateCustomer(id)
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchCustomers = async () => {
            try {
                const response = await getAllCustomers();
                if (response?.status) {
                    setCustomer(response?.data ?? []);
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
            <div className="p-8">
                <h2 className="mb-6 text-2xl font-bold text-slate-800">Customers</h2>
                <Table
                    columns={columns}
                    data={customer}
                    keyExtractor={(row) => row._id}
                    loading={loading}
                    actions={(row) => (
                        <ActionButtons
                            onEdit={() => router.push(`/admin/customer/${row._id}`)}
                            // onDelete={handleDelete(row._id)}
                        />
                    )}
                />
            </div>
        </>
    )
}