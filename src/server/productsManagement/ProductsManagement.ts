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

export const getAllProducts=async()=>{
    try {
        const res=await axiosInstance.get('/products')
        return res.data
    }catch(error:any){
        console.log(error)
        throw new Error(error.message)
    }
}


export const deleteProduct=async(id:string)=>{
    try {
        const res=await axiosInstance.delete(`/products/delete/${id}`)
        return res.data
    }catch(error:any){
        console.log(error)
        throw new Error(error.message)
    }
}


export const getSingleProduct=async(id:string)=>{
    try {
        const res=await axiosInstance.get(`/products/get/${id}`)
        return res.data
    }catch(error:any){
        console.log(error)
        throw new Error(error.message)
    }
}


export const updateProduct=async(id:string,productData:FieldValues)=>{
    try {
        const res=await axiosInstance.patch(`/products/update/${id}`,productData)
        return res.data
    }catch(error:any){
        console.log(error)
        throw new Error(error.message)
    }
}