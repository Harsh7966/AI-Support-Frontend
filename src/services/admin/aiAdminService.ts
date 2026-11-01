import axiosInstance from "../axios";

export interface AiTotals {
    calls: number;
    errors: number;
    errorRate: number;
    inputTokens: number;
    outputTokens: number;
    avgLatencyMs: number;
    estimatedCostUsd: number | null;
}

export interface AiFeatureStat {
    feature: string;
    calls: number;
    errors: number;
    inputTokens: number;
    outputTokens: number;
    avgLatencyMs: number;
    estimatedCostUsd: number | null;
}

export interface AiDailyStat {
    date: string;
    calls: number;
    errors: number;
}

export interface AiRecentError {
    _id: string;
    feature: string;
    kind: string;
    error: string | null;
    createdAt: string;
}

export interface AiStats {
    days: number;
    totals: AiTotals;
    byFeature: AiFeatureStat[];
    daily: AiDailyStat[];
    recentErrors: AiRecentError[];
}

export interface AiToggles {
    aiEnabled: boolean;
    classificationEnabled: boolean;
    assistantEnabled: boolean;
}

export interface AiSettings {
    toggles: AiToggles;
    config: {
        llmModel: string;
        embeddingModel: string;
        embeddingDimension: number;
        topK: number;
        minScore: number;
        maxQuestionLength: number;
        maxOutputTokens: number;
        maxKnowledgeLength: number;
        costConfigured: boolean;
        rateLimitsPer15Min: {
            ticketAndChat: number;
            customerAssistant: number;
            agentTools: number;
            adminAi: number;
        };
    };
    vectors: { tickets: number | null; knowledge: number | null };
}

interface ApiResponse<T> {
    status: boolean;
    data?: T;
    msg?: string;
}

// Admin AI monitoring: GET /admin/ai-stats?days=7
export const getAiStats = async (days: number): Promise<ApiResponse<AiStats>> => {
    const response = await axiosInstance.get("/admin/ai-stats", { params: { days } });
    return response.data;
};

// Admin AI settings: GET / PATCH /admin/ai-settings
export const getAiSettings = async (): Promise<ApiResponse<AiSettings>> => {
    const response = await axiosInstance.get("/admin/ai-settings");
    return response.data;
};

export const updateAiSettings = async (patch: Partial<AiToggles>): Promise<ApiResponse<AiToggles>> => {
    const response = await axiosInstance.patch("/admin/ai-settings", patch);
    return response.data;
};
