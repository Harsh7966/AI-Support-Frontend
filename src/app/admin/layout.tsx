"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LogoutButton from "@/component/LogoutButton";

const navSections = [
    {
        title: "Main",
        items: [
            { label: "Dashboard", href: "/admin", icon: "📊" },
            { label: "Tickets", href: "/admin/ticket", icon: "🎫" },
        ],
    },
    {
        title: "Management",
        items: [
            { label: "Customers", href: "/admin/customer", icon: "👥" },
            { label: "Agents", href: "/admin/agents", icon: "🧑‍💼" },
            { label: "Categories", href: "/admin/categories", icon: "🏷️" },
        ],
    },
    {
        title: "AI & Knowledge",
        items: [
            { label: "Knowledge Base", href: "/admin/knowledge-base", icon: "📚" },
            { label: "AI Monitoring", href: "/admin/ai-monitoring", icon: "🤖" },
            { label: "AI Settings", href: "/admin/ai-settings", icon: "⚙️" },
        ],
    },
    {
        title: "Account",
        items: [{ label: "Profile", href: "/admin/profile", icon: "👤" }],
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);

    const isActive = (href: string) =>
        href === "/admin" ? pathname === href : pathname.startsWith(href);

    const currentTitle =
        navSections
            .flatMap((section) => section.items)
            .find((item) => item.href !== "/admin" && isActive(item.href))
            ?.label ?? "Admin Dashboard";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto border-r border-slate-200 bg-white">
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-slate-200 px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                            S
                        </div>

                        <span className="text-xl font-bold text-slate-800">
                            SupportDesk
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 p-4">
                    {navSections.map((section, index) => (
                        <div key={section.title}>
                            <p
                                className={`mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 ${
                                    index > 0 ? "mt-6" : ""
                                }`}
                            >
                                {section.title}
                            </p>

                            {section.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                                        isActive(item.href)
                                            ? "bg-indigo-50 text-indigo-600"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64">
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
                    <div>
                        <h1 className="text-lg font-semibold text-slate-800">
                            {currentTitle}
                        </h1>

                        <p className="text-xs text-slate-500">
                            Manage your support system
                        </p>
                    </div>

                    <div className="flex items-center gap-5">
                        {/* Notification */}
                        <button className="relative text-xl">
                            🔔
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                4
                            </span>
                        </button>

                        {/* Admin */}
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                                {user?.email?.charAt(0).toUpperCase() || "A"}
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    {user?.email || "Admin"}
                                </p>

                                <p className="text-xs capitalize text-slate-400">
                                    {user?.role || "admin"}
                                </p>
                            </div>
                        </div>

                        <LogoutButton variant="light" />
                    </div>
                </header>

                {/* Page content */}
                {children}
            </main>
        </div>
    );
}
