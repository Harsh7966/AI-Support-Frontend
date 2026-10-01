import axiosInstance from "../axios";

export interface Agent{
    _id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    role: string;
    isEmailVerified?: boolean;
    isActive?: boolean;
    password: string;
    confirmPassword: string;
}

interface agentListingResponse{
    status: Boolean;
    data?: Agent[];
    msg: string;
}

interface agentDetailResponse{
    status: Boolean;
    data?: Agent;
    msg: string;
}

export const getAllAgent= async(): Promise<agentListingResponse>=>{
    const response= await axiosInstance.get("/admin/all-agents");
    return response.data;
}

export const getAgentDetails= async(id: string): Promise<agentDetailResponse>=>{
    const response= await axiosInstance.get(`/admin/agent-details/${id}`);
    return response.data;
}

export const updateAgent= async(id: string ,data: Partial<Agent>): Promise<agentDetailResponse>=>{
    const response= await axiosInstance.patch(`/admin/update-agent/${id}`, data);
    return response.data;
}

export const createAgent= async(data: Partial<Agent>): Promise<agentDetailResponse>=>{
    const response= await axiosInstance.post(`/admin/create-agent`, data);
    return response.data;
}