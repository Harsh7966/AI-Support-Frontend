"use client";

import { Customer, getCustomerDetails, updateCustomer } from "@/services/admin/customerService";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function EditCustomerPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [details, setDetails] = useState<Partial<Customer>>({});
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const fetchDetails = async () => {
            try {
                const response = await getCustomerDetails(id);
                if (response?.status && response.data) setDetails(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchDetails();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: checked
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await updateCustomer(id, details);
            if (response.status) {
                toast.success(response?.msg);
                router.push("/admin/customer");
            } else toast.error(response?.msg);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="p-8">
            {/* Breadcrumb + title */}
            <div className="mb-6">
                <nav className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                    <Link href="/admin/customer" className="hover:text-indigo-600">
                        Customers
                    </Link>
                    <span>/</span>
                    <span className="text-slate-700">Edit</span>
                </nav>

                <h2 className="text-2xl font-bold text-slate-800">Edit Customer</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Update customer details and account settings.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* Left: profile summary */}
                    <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl font-semibold text-indigo-600">
                                C
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-slate-800">{`${details?.firstName ?? "John"} ${details?.lastName ?? "Doe"}`}</h3>

                            <p className="text-sm text-slate-500">{details?.email}</p>

                            <span className="mt-3 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{details?.isActive ? "Active" : "Inactive"}</span>
                        </div>

                        <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">Customer ID</span>
                                <span className="font-medium text-slate-700">{details?._id}</span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">Role</span>
                                <span className="font-medium text-slate-700">{details?.role}</span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">Email</span>
                                <span className="font-medium text-green-600">{details?.isEmailVerified ? "Verified" : "Not verified"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="space-y-6 xl:col-span-2">
                        {/* Personal info */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 px-6 py-4">
                                <h3 className="font-semibold text-slate-800">
                                    Personal Information
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Basic details of the customer
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className={labelClass}>
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="Enter first name"
                                        className={inputClass}
                                        name="firstName"
                                        value={details?.firstName ?? ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className={labelClass}>
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Enter last name"
                                        className={inputClass}
                                        name="lastName"
                                        value={details?.lastName ?? ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className={labelClass}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className={inputClass}
                                        name="email"
                                        value={details?.email ?? ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className={labelClass}>
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        className={inputClass}
                                        name="phone"
                                        value={details?.phone ?? ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account settings */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 px-6 py-4">
                                <h3 className="font-semibold text-slate-800">
                                    Account Settings
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Role and access of the customer
                                </p>
                            </div>

                            <div className="space-y-5 p-6">
                                <div className="sm:max-w-xs">
                                    <label htmlFor="role" className={labelClass}>
                                        Role
                                    </label>
                                    <select id="role" name="role" value={details?.role ?? "user"} onChange={handleChange} className={inputClass}>
                                        <option value="user">User</option>
                                        <option value="agent">Agent</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Email Verified
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Mark the customer email as verified
                                        </p>
                                    </div>

                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" name="isEmailVerified" checked={details?.isEmailVerified ?? false} onChange={handleToggle} className="peer sr-only" />
                                        <div className="h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:bg-indigo-600 peer-checked:after:translate-x-5" />
                                    </label>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Account Active
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Inactive customers cannot log in
                                        </p>
                                    </div>

                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            className="peer sr-only"
                                            checked={details?.isActive ?? false}
                                            onChange={handleToggle}
                                        />
                                        <div className="h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:bg-indigo-600 peer-checked:after:translate-x-5" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-3">
                            <Link
                                href="/admin/customer"
                                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
