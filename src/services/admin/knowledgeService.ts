import axiosInstance from "../axios";

export interface KnowledgeEntry {
    _id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface KnowledgeInput {
    title: string;
    content: string;
    category?: string;
}

interface KnowledgeListResponse {
    status: boolean;
    data?: KnowledgeEntry[];
    msg?: string;
}

interface KnowledgeItemResponse {
    status: boolean;
    data?: KnowledgeEntry;
    msg?: string;
}

interface SimpleResponse {
    status: boolean;
    indexed?: number;
    msg?: string;
}

// Admin knowledge base APIs (/ai/knowledge)
export const getKnowledgeList = async (): Promise<KnowledgeListResponse> => {
    const response = await axiosInstance.get("/ai/knowledge");
    return response.data;
};

export const createKnowledge = async (data: KnowledgeInput): Promise<KnowledgeItemResponse> => {
    const response = await axiosInstance.post("/ai/knowledge", data);
    return response.data;
};

export const updateKnowledge = async (id: string, data: Partial<KnowledgeInput>): Promise<KnowledgeItemResponse> => {
    const response = await axiosInstance.patch(`/ai/knowledge/${id}`, data);
    return response.data;
};

export const deleteKnowledge = async (id: string): Promise<SimpleResponse> => {
    const response = await axiosInstance.delete(`/ai/knowledge/${id}`);
    return response.data;
};

export const reindexKnowledge = async (): Promise<SimpleResponse> => {
    const response = await axiosInstance.post("/ai/knowledge/reindex");
    return response.data;
};
