import { ProfileInfo } from "@/services/authService";

const formatDate = (d: string) => new Date(d).toLocaleDateString("en-GB");

const themes = {
    light: {
        card: "border-slate-200 bg-white shadow-sm",
        title: "text-slate-800",
        muted: "text-slate-500",
        label: "text-slate-400",
        avatar: "bg-indigo-100 text-indigo-600",
    },
    dark: {
        card: "border-white/10 bg-white/5",
        title: "text-white",
        muted: "text-slate-400",
        label: "text-slate-500",
        avatar: "bg-gradient-to-br from-blue-500 to-purple-500 text-white",
    },
};

// theme: "light" for the admin portal, "dark" for the agent / customer portals
export default function Profile({
    profile,
    theme = "light",
}: {
    profile: ProfileInfo;
    theme?: "light" | "dark";
}) {
    const t = themes[theme];
    const fullName = `${profile.firstName} ${profile.lastName}`;
    const fields = [
        { label: "First Name", value: profile.firstName },
        { label: "Last Name", value: profile.lastName },
        { label: "Email", value: profile.email },
        { label: "Phone", value: profile.phone },
        { label: "Role", value: profile.role },
        { label: "Status", value: profile.isActive ? "Active" : "Inactive" },
        { label: "Email Verified", value: profile.isEmailVerified ? "Yes" : "No" },
        { label: "Last Login", value: profile.lastLoginAt ? formatDate(profile.lastLoginAt) : "Never" },
        { label: "Member Since", value: formatDate(profile.createdAt) },
    ];

    return (
        <div className="p-8">
            <h2 className={`mb-6 text-2xl font-bold ${t.title}`}>My Profile</h2>

            <div className={`max-w-3xl rounded-xl border p-6 ${t.card}`}>
                <div className="mb-6 flex items-center gap-4">
                    <div
                        className={`flex h-20 w-20 items-center justify-center rounded-full text-3xl font-semibold ${t.avatar}`}
                    >
                        {profile.firstName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className={`text-lg font-semibold ${t.title}`}>{fullName}</h3>
                        <p className={`text-sm capitalize ${t.muted}`}>{profile.role}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {fields.map((f) => (
                        <div key={f.label}>
                            <p className={`text-xs font-medium uppercase tracking-wider ${t.label}`}>
                                {f.label}
                            </p>
                            <p className={`mt-1 text-sm font-medium ${t.title}`}>
                                {f.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
