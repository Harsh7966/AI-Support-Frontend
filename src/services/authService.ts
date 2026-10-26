import axiosInstance from "./axios";

interface AuthRequest {
    email: string;
    password: string;
    role?: string;
}

export interface AuthResponse {
    status: boolean;
    msg: string;
    jwt?: string;
}

export interface ProfileInfo {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: string;
    isEmailVerified: boolean;
    isActive: boolean;
    lastLoginAt: string | null;
    createdAt: string;
}

interface ProfileResponse{
    status: boolean;
    data: ProfileInfo;
    msg: string
}


export const authUser= async(data: AuthRequest):Promise<AuthResponse> =>{
    const response= await axiosInstance.post(
        "/auth",
        data
    )
    return response.data;
}

export const userProfileDetail= async():Promise<ProfileResponse> =>{
    const response= await axiosInstance.get(
        "/user/profile"
    )
    return response.data;
}

export const agentProfileDetail= async():Promise<ProfileResponse> =>{
    const response= await axiosInstance.get(
        "/agent/profile"
    )
    return response.data;
}

export const adminProfileDetail= async():Promise<ProfileResponse> =>{
    const response= await axiosInstance.get(
        "/admin/profile"
    )
    return response.data;
}