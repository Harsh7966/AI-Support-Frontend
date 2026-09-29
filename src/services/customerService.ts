import axiosInstance from "./axios";

export interface Customer{
    _id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    role: string;
    isEmailVerified?: boolean;
    isActive?: boolean;
}

interface customerListingResponse{
    status: Boolean;
    data?: Customer[];
    msg: string;
}

interface customerDetailResponse{
    status: Boolean;
    data?: Customer;
    msg: string;
}

export const getAllCustomers= async(): Promise<customerListingResponse>=>{
    const response= await axiosInstance.get("/admin/all-customer");
    return response.data;
}

export const getCustomerDetails= async(id: string): Promise<customerDetailResponse>=>{
    const response= await axiosInstance.get(`/admin/customer-by-id/${id}`);
    return response.data;
}

export const updateCustomer= async(id: string ,data: Partial<Customer>): Promise<customerDetailResponse>=>{
    const response= await axiosInstance.patch(`/admin/update-customer/${id}`, data);
    return response.data;
}