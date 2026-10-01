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

export const getAllCategory= async(): Promise<categoryListingResponse>=>{
    const response= await axiosInstance.get("/user/all-category");
    return response.data;
}