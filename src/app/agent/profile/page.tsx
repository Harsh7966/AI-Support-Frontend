"use client";

import Profile from "@/component/Profile";
import PortalShell from "@/component/PortalShell";
import { useEffect, useState } from "react";
import { agentProfileDetail, ProfileInfo } from "@/services/authService";

export default function AgentProfilePage() {
    const [profile, setProfile]= useState<ProfileInfo>();
    
        useEffect(()=>{
            const fetchProfile= async()=>{
                try{
                    const response= await agentProfileDetail();
                    console.log(response, "User profile details");
                    if(response.status) setProfile(response?.data);
                }catch(err){
                    console.log(err);
                }
            }
            fetchProfile()
        },[])

    return (
        <PortalShell role="agent" title="My Profile">
            {
                profile ?
                (<Profile profile={profile} theme="dark"/>)
                :
                (<p className="p-8 text-slate-400">
                    Loading profile...
                </p>)
            }
        </PortalShell>
    );
}
