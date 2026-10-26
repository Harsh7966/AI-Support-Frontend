"use client";

import Profile from "@/component/Profile";
import { adminProfileDetail, ProfileInfo } from "@/services/authService";
import { useEffect, useState } from "react";

export default function AdminProfilePage() {
    const [profile, setProfile] = useState<ProfileInfo>();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await adminProfileDetail();
                console.log(response, "User profile details");
                if (response.status) setProfile(response?.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProfile()
    }, [])
    return (
        <>
            {
                profile ?
                    <Profile profile={profile} />
                    :
                    <p className="p-8 text-slate-400">
                        Loading profile...
                    </p>
            }
        </>
    );
}
