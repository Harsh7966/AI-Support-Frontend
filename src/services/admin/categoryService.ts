import axiosInstance from "../axios";

export interface Category{
    _id: string;
    name?: string;
    description?: string;
    isActive?: boolean;
}

interface categoryListingResponse{
    status: Boolean;
    data?: Category[];
    msg: string;
}

interface categoryDetailResponse{
    status: Boolean;
    data?: Category;
    msg: string;
}

export const getAllCategory= async(): Promise<categoryListingResponse>=>{
    const response= await axiosInstance.get("/admin/all-category");
    return response.data;
}

export const getCategoryDetails= async(id: string): Promise<categoryDetailResponse>=>{
    const response= await axiosInstance.get(`/admin/category-details/${id}`);
    return response.data;
}

export const updateCategory= async(id: string ,data: Partial<Category>): Promise<categoryDetailResponse>=>{
    const response= await axiosInstance.patch(`/admin/update-category/${id}`, data);
    return response.data;
}

export const createCategory= async(data: Partial<Category>): Promise<categoryDetailResponse>=>{
    const response= await axiosInstance.post(`/admin/create-category`, data);
    return response.data;
}