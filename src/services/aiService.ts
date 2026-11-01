import axiosInstance from "./axios";

// ---------- Types ----------
export interface AiSummary {
    category?: string;
    priority: string;
    summary?: string;
    keyPoints: string[];
    suggestedNextStep?: string;
}

interface TicketInterface {
    title?: string;
    description?: string;
}

export interface AiSource {
    ticketId: string;
    title: string;
    category: string;
    score: number;
}

export interface AskAssistantResponse {
    status: boolean;
    found?: boolean;
    answer?: string;
    sources?: AiSource[];
    msg?: string;
}

export interface SimilarTicketsResponse {
    status: boolean;
    data?: AiSource[];
    msg?: string;
}

export interface DraftResponse {
    status: boolean;
    data?: { aiDraft?: string };
    msg?: string;
}

export interface IndexTicketsResponse {
    status: boolean;
    indexed?: number;
    skipped?: number;
    msg?: string;
}

// ---------- APIs ----------

// Ticket summary (agent) -> POST /ai/ticket-summary/:id
export const getAiTicketSummary = async (data: TicketInterface, id: string) => {
    const response = await axiosInstance.post(`/ai/ticket-summary/${id}`, data);
    return response.data;
};

// Suggested reply draft (agent) -> GET /ai/generateDraft/:id
export const getAiDraft = async (ticketId: string): Promise<DraftResponse> => {
    const response = await axiosInstance.get(`/ai/generateDraft/${ticketId}`);
    return response.data;
};

// RAG assistant: purane tickets se jawab (agent) -> POST /ai/ask  (rate limited: 20 / 15 min)
export const askAssistant = async (question: string): Promise<AskAssistantResponse> => {
    const response = await axiosInstance.post("/ai/ask", { question });
    return response.data;
};

// Semantic search: milte-julte tickets (agent) -> POST /ai/similar-tickets
export const getSimilarTickets = async (query: string, category?: string): Promise<SimilarTicketsResponse> => {
    const response = await axiosInstance.post("/ai/similar-tickets", { query, category });
    return response.data;
};

// Tickets ko Qdrant me index karo (admin) -> POST /ai/index-tickets
export const indexAllTickets = async (): Promise<IndexTicketsResponse> => {
    const response = await axiosInstance.post("/ai/index-tickets");
    return response.data;
};

// Backend se aaya error message nikalne ka helper (429 rate limit bhi isi se aata hai)
export const getApiErrorMsg = (err: unknown, fallback = "Something went wrong"): string => {
    const e = err as { response?: { data?: { msg?: string } } };
    return e?.response?.data?.msg || fallback;
};

// ---------- Customer AI assistant (RAG + tools) ----------
export interface KbSource {
    docId: string;
    title: string;
    category: string;
    score: number;
}

export interface CustomerAssistantResponse {
    status: boolean;
    found?: boolean;
    answer?: string;
    sources?: KbSource[];
    toolsUsed?: string[];
    msg?: string;
}

// Customer sawaal poochta hai -> POST /ai/assistant  (jawab: knowledge base + customer ke apne tickets se)
export const askCustomerAssistant = async (question: string): Promise<CustomerAssistantResponse> => {
    const response = await axiosInstance.post("/ai/assistant", { question });
    return response.data;
};
