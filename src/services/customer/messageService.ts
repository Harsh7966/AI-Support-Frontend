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

// Purani chat history (customer)
export const getMessages = async (ticketId: string): Promise<MessageListResponse> => {
    const response = await axiosInstance.get(`/user/messages/${ticketId}`);
    return response.data;
};
