"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

            {/* Auth Card */}
            <div className="relative w-full max-w-md">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">

                    {/* Logo / Heading */}
                    <div className="mb-8 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-7 w-7 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                                />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            Login to your account to continue
                        </p>
                    </div>

                    <form className="space-y-5">

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-200"
                            >
                                Email address
                            </label>

                            <div className="relative">

                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.7}
                                        stroke="currentColor"
                                        className="h-5 w-5 text-slate-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25"
                                        />
                                    </svg>
                                </div>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-200"
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-xs font-medium text-blue-400 hover:text-blue-300"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="relative">

                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.7}
                                        stroke="currentColor"
                                        className="h-5 w-5 text-slate-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21H6.75a2.25 2.25 0 0 1-2.25-2.25v-6A2.25 2.25 0 0 1 6.75 10.5Z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3.5 pl-11 pr-12 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-white"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/30 active:scale-[0.98]"
                        >
                            Login
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-7 text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-blue-400 transition hover:text-blue-300"
                        >
                            Create account
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-slate-600">
                    © 2026 Your Application. All rights reserved.
                </p>
            </div>
        </main>
    );
}