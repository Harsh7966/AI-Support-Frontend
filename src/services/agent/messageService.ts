import axiosInstance from "../axios";

export interface Message {
    _id: string;
    ticketId: string;
    senderId: string;
    senderRole: string;
    message: string;
    createdAt: string;
}

export interface MessageListResponse {
    status: boolean;
    data?: Message[];
    msg: string;
}

// Purani chat history (agent)
export const getMessages = async (ticketId: string): Promise<MessageListResponse> => {
    const response = await axiosInstance.get(`/agent/messages/${ticketId}`);
    return response.data;
};
