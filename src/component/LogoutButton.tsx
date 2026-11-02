"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { disconnectSocket } from "@/services/socket";

// Ek hi logout button: admin, agent aur user teeno portals me use hota hai.
export default function LogoutButton({
    variant = "dark",
    className = "",
}: {
    variant?: "dark" | "light";
    className?: string;
}) {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
        } catch (err) {
            console.log(err);
        }
        disconnectSocket();
        dispatch(logout());
        router.replace("/login");
    };

    const styles =
        variant === "dark"
            ? "mt-3 w-full border border-white/10 bg-white/5 text-slate-300 hover:bg-red-500/10 hover:text-red-400"
            : "border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600";

    return (
        <button
            type="button"
            onClick={handleLogout}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${styles} ${className}`}
        >
            <span>⎋</span>
            Logout
        </button>
    );
}
