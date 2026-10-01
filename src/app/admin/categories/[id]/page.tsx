"use client";

import { Category, getCategoryDetails, updateCategory } from "@/services/admin/categoryService";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function EditCategoryPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [details, setDetails] = useState<Partial<Category>>({});
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const fetchDetails = async () => {
            try {
                const response = await getCategoryDetails(id);
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
            const response = await updateCategory(id, details);
            if (response.status) {
                toast.success(response?.msg);
                router.push("/admin/categories");
            } else toast.error(response?.msg);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="p-8">
            <div className="mb-6">
                <nav className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                    <Link href="/admin/categories" className="hover:text-indigo-600">
                        Category
                    </Link>
                    <span>/</span>
                    <span className="text-slate-700">Edit</span>
                </nav>

                <h2 className="text-2xl font-bold text-slate-800">Edit Category</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* Right: form */}
                    <div className="space-y-6 xl:col-span-2">
                        {/* Personal info */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className={labelClass}>
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter category name"
                                        className={inputClass}
                                        required
                                        value={details?.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className={labelClass}>
                                        Description
                                    </label>
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Enter description"
                                        className={inputClass}
                                        value={details?.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account settings */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="space-y-5 p-6">

                                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Account Active
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
                                href="/admin/categories"
                                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Edit Category
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
