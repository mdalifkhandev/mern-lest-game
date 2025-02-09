'use server'

import axiosInstance from "@/src/lib/AxiosInstance"

export const addCardCreate = async (cardData: any) => {
    try {
        const res = await axiosInstance.post('/addcard/create', cardData);
        return res.data;
    } catch (error: any) {
        console.error("Error creating card:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}

export const getAllCards = async (id:string) => {
    try {
        const res = await axiosInstance.get(`/addcard/${id}`);
        return res.data;
    } catch (error: any) {
        console.error("Error getting all cards:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}


export const updathAddcard=async(data:any)=>{
    try {
        const res = await axiosInstance.patch(`/addcard`,data);
        return res.data;
    } catch (error: any) {
        console.error("Error getting all cards:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}