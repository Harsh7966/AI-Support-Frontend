"use client"

import { Agent, createAgent } from "@/services/agentService";
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
    const [agent, setAgent]= useState<Partial<Agent>>({});

    const handleChange= (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name, value}= e.target;

        setAgent((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const handleToggleChange= (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, checked}= e.target;

        setAgent((prev)=>({
            ...prev,
            [name]:checked
        }))
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        try{
            e.preventDefault();
            if(agent.password !== agent?.confirmPassword) {
                toast.error("Confirm password is not matched with password.");
                return;
            }
            const response= await createAgent(agent);
            if(response?.status){
                toast.success(response?.msg); 
                router.push("/admin/agents");
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
                    <Link href="/admin/agents" className="hover:text-indigo-600">
                        Agents
                    </Link>
                    <span>/</span>
                    <span className="text-slate-700">Create</span>
                </nav>

                <h2 className="text-2xl font-bold text-slate-800">Create Agent</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Add a new support agent and set up their account access.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* Left: live preview */}
                    <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl font-semibold text-indigo-600">
                                A
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-slate-800">{`${agent?.firstName ?? ""} ${agent?.lastName ?? ""}`}</h3>

                            <p className="text-sm text-slate-500">
                                {agent?.email ?? "example@gmail.com"}
                            </p>

                            <span className="mt-3 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                {agent?.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>

                        <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">Role</span>
                                <span className="font-medium text-slate-700">{agent?.role ?? "Agent"}</span>
                            </div>

                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">Email</span>
                                <span className="font-medium text-green-600">{agent?.isEmailVerified ? "Verified" : "Unverified"}</span>
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
                                    Basic details of the agent
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className={labelClass}>
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter first name"
                                        className={inputClass}
                                        required
                                        value={agent?.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className={labelClass}>
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Enter last name"
                                        className={inputClass}
                                        value={agent?.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className={labelClass}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className={inputClass}
                                        required
                                        value={agent?.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className={labelClass}>
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        className={inputClass}
                                        value={agent?.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 px-6 py-4">
                                <h3 className="font-semibold text-slate-800">Security</h3>
                                <p className="text-xs text-slate-500">
                                    Set the password the agent will use to log in
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="password" className={labelClass}>
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Min. 6 characters"
                                            className={`${inputClass} pr-14`}
                                            required
                                            value={agent?.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 px-3.5 text-xs font-medium text-slate-500 hover:text-indigo-600"
                                        >
                                            Show
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className={labelClass}>
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Re-enter password"
                                        className={inputClass}
                                        required
                                        value={agent?.confirmPassword}
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
                                    Access and status of the agent
                                </p>
                            </div>

                            <div className="space-y-5 p-6">
                                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Email Verified
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Mark the agent&apos;s email as verified
                                        </p>
                                    </div>

                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="isEmailVerified"
                                            className="peer sr-only"
                                            checked={agent?.isEmailVerified ?? false}
                                            onChange={handleToggleChange}
                                        />
                                        <div className={toggleTrack} />
                                    </label>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Account Active
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Inactive agents cannot log in
                                        </p>
                                    </div>

                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            className="peer sr-only"
                                            checked={agent?.isActive ?? false}
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
                                href="/admin/agents"
                                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Create Agent
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
