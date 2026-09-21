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

export const authUser= async(data: AuthRequest):Promise<AuthResponse> =>{
    const response= await axiosInstance.post(
        "/auth",
        data
    )
    return response.data;
}