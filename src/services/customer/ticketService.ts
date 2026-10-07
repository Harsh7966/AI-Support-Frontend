import axiosInstance from "../axios";

export interface Ticket {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
    categoryId?: { _id: string; name: string } | string;
    createdAt: string;
}

interface TicketDetailsResponse{
    status: Boolean;
    data?: Ticket[];
    msg: string;
}

interface TicketsListingResponse{
    status: Boolean;
    data?: Ticket[];
    msg: string;
}

export const createTicket= async(data: Partial<Ticket>): Promise<TicketDetailsResponse>=>{
    const response= await axiosInstance.post("/user/create-ticket", data);
    return response.data;
}

export const myTickets= async(): Promise<TicketsListingResponse>=>{
    const response= await axiosInstance.get("/user/getall-ticket");
    return response.data;
}

interface TicketDetailResponse {
    status: boolean;
    data?: Ticket;
    msg: string;
}

export const getTicketDetails= async(id: string): Promise<TicketDetailResponse>=>{
    const response= await axiosInstance.get(`/user/ticket-detail/${id}`);
    return response.data;
}
