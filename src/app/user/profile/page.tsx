"use client";

import Profile from "@/component/Profile";
import PortalShell from "@/component/PortalShell";
import { useEffect, useState } from "react";
import { ProfileInfo, userProfileDetail } from "@/services/authService";

export default function CustomerProfilePage() {
    const [profile, setProfile]= useState<ProfileInfo>();

    useEffect(()=>{
        const fetchProfile= async()=>{
            try{
                const response= await userProfileDetail();
                console.log(response, "User profile details");
                if(response.status) setProfile(response?.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchProfile()
    },[])

    return (
        <PortalShell role="customer" title="My Profile">
            {
                profile ? (
                    <Profile profile={profile} theme="dark"/>
                ):
                (
                <p className="p-8 text-slate-400">
                    Loading profile...
                </p>
            )
            }
        </PortalShell>
    );
}
