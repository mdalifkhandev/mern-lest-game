"use server"


import axiosInstance from "@/src/lib/AxiosInstance"
import { FieldValues } from "react-hook-form"

export const productsCreate=async(productsData:FieldValues)=>{
    try {
        const res=await axiosInstance.post('/products/create',productsData)
        return res.data
    } catch (error:any) {
        console.log(error)
        throw new Error(error.message)
    }
}