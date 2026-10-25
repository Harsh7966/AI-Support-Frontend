import axiosInstance from "../axios";

export interface TicketUser {
    _id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    role: string;
    phone?: string;
    isActive?: boolean;
    isEmailVerified?: boolean;
    isDeleted?: boolean;
}

export interface TicketCategory {
    _id: string;
    name: string;
    description?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}

export interface Ticket {
    _id: string;

    customerId: TicketUser;

    assignedAgentId?: TicketUser | null;

    categoryId: TicketCategory;

    title: string;
    description: string;

    priority: string;
    status: string;
    aiPriority: string;
    aiSummary: string;
    aiCategory: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AssignTicket {
    _id: string;

    customerId?: {
        _id: string;
        firstName?: string;
        lastName?: string;
    };

    assignedAgentId?: {
        _id: string;
        firstName?: string;
        lastName?: string;
    };

    categoryId: {
        _id: string;
        name: string;
    };

    title: string;
    description: string;

    priority: string;
    status: string;
    aiPriority: string;
    aiSummary: string;
    aiCategory: string;
    createdAt?: string;
    updatedAt?: string;
}

interface TicketListingResponse {
    status: boolean;
    data?: Ticket[];
    msg: string;
}

interface TicketDetailResponse {
    status: boolean;
    data?: Ticket;
    msg: string;
}

interface AgentDashboardResponse {
    status: boolean;
    tickets: AssignTicket[];
    open: number;
    pending: number;
    resolved: number;
    total: number;
}

interface updateTicket {
    priority?: string;
    status?: string;
}

export const getAllTickets = async (): Promise<TicketListingResponse> => {
    const response = await axiosInstance.get("/agent/getall-ticket");
    return response.data;
}

export const getTicketDetails = async (id: string): Promise<TicketDetailResponse> => {
    const response = await axiosInstance.get(`/agent/ticket-detail/${id}`);
    return response.data;
}

export const upadteTicketDetails = async (data: updateTicket, id: string): Promise<TicketDetailResponse> => {
    const response = await axiosInstance.patch(`/agent/update-ticket/${id}`, data);
    return response.data;
}

export const agentDashboardData = async (): Promise<AgentDashboardResponse> => {
    const response = await axiosInstance.get("/agent/agent-dashboard");
    return response.data;
}