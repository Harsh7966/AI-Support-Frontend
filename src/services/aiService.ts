import axiosInstance from "./axios";

export interface AiSummary{
    category?: string;
    priority: string;
    summary?: string;
    keyPoints: string[];
    suggestedNextStep?: string
}
interface ticketInterface {
    title?: string;
    description?: string;
}

export const getAiTicketSummary = async (data: ticketInterface, id: string) => {
    const response = await axiosInstance.post(`/ai/ticket-summary/${id}`, data);
    return response.data;
}