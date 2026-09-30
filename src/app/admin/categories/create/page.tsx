"use client"

import { Category, createCategory } from "@/services/categoryService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

const toggleTrack =
    "h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:bg-indigo-600 peer-checked:after:translate-x-5";

export default function CreateAgent() {
    const router= useRouter();
    const [category, setCategory]= useState<Partial<Category>>({});

    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value}= e.target;

        setCategory((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const handleToggleChange= (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, checked}= e.target;

        setCategory((prev)=>({
            ...prev,
            [name]:checked
        }))
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        try{
            e.preventDefault();
            const response= await createCategory(category);
            if(response?.status){
                toast.success(response?.msg); 
                router.push("/admin/categories");
            } else{
                toast.error(response?.msg);
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="p-8">
            {/* Breadcrumb + title */}
            <div className="mb-6">
                <nav className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                    <Link href="/admin/categories" className="hover:text-indigo-600">
                        Category
                    </Link>
                    <span>/</span>
                    <span className="text-slate-700">Create</span>
                </nav>

                <h2 className="text-2xl font-bold text-slate-800">Create Category</h2>
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
                                        value={category?.name}
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
                                        value={category?.description}
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
                                            checked={category?.isActive ?? false}
                                            onChange={handleToggleChange}
                                        />
                                        <div className={toggleTrack} />
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
                                Create Category
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
