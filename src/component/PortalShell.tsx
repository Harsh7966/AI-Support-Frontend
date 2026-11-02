"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LogoutButton from "@/component/LogoutButton";

type PortalRole = "agent" | "customer";

const portals = {
    agent: {
        label: "Support Agent",
        subtitle: "Manage and resolve your assigned tickets",
        fallbackName: "Agent",
        nav: [
            { label: "Dashboard", href: "/agent", icon: "⌂" },
            { label: "Assigned Tickets", href: "/agent/ticket", icon: "▣" },
            { label: "Profile", href: "/agent/profile", icon: "◉" },
        ],
    },
    customer: {
        label: "Customer",
        subtitle: "Manage your support requests",
        fallbackName: "Customer",
        nav: [
            { label: "Dashboard", href: "/user", icon: "⌂" },
            { label: "My Tickets", href: "/user/tickets", icon: "▣" },
            { label: "Create Ticket", href: "/user/create-ticket", icon: "＋" },
            { label: "AI Assistant", href: "/user/ai-assistant", icon: "✦" },
            { label: "Profile", href: "/user/profile", icon: "◉" },
        ],
    },
};

// Sidebar + header for the agent / customer portals.
// Wrap any page in it and only the page content changes.
export default function PortalShell({
    role,
    title,
    children,
}: {
    role: PortalRole;
    title: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);
    const portal = portals[role];
    const root = portal.nav[0].href;

    const isActive = (href: string) =>
        href === root ? pathname === href : pathname.startsWith(href);

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 lg:block">
                <div className="flex h-16 items-center border-b border-white/10 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold">
                            AI
                        </div>
                        <span className="text-lg font-bold">SupportDesk</span>
                    </div>
                </div>

                <nav className="space-y-1 p-4">
                    {portal.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                isActive(item.href)
                                    ? "bg-blue-600/10 font-medium text-blue-400"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold">
                            {user?.email?.charAt(0).toUpperCase() ||
                                portal.fallbackName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                {user?.email || portal.fallbackName}
                            </p>
                            <p className="text-xs text-blue-400">{portal.label}</p>
                        </div>
                    </div>
                <LogoutButton />
                </div>
            </aside>

            {/* Main */}
            <main className="lg:ml-64">
                <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">
                    <div>
                        <h1 className="text-lg font-semibold">{title}</h1>
                        <p className="text-xs text-slate-500">{portal.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:text-white"
                        >
                            🔔
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
                        </button>

                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium">
                                {user?.email || portal.fallbackName}
                            </p>
                            <p className="text-xs text-slate-500">{portal.label}</p>
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
