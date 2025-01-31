"use server"

import axiosInstance from "@/src/lib/AxiosInstance"

export const getAllUsers=async()=>{
    try{
        const res=await axiosInstance.get('/auth')
        return res.data
    }catch(error){
        console.log(error)
        throw new Error('Error fetching users')
    }
}

export const getSingleUser=async(userId:string)=>{
    try{
        const res=await axiosInstance.get(`/auth/${userId}`)
        return res.data
    }
    catch(error){
        console.log(error)
        throw new Error('Error fetching user')
    }
}

export const deleteUser=async(userId:string)=>{
    try{
        const res=await axiosInstance.delete(`/auth/${userId}`)
        return res.data
    }catch(error){
        console.log(error)
        throw new Error('Error deleting user')
    }
}

export const updateUser=async(userId:string,user:any)=>{
    try{
        const res=await axiosInstance.patch(`/auth/${userId}`,user)
        return res.data
    }catch(error){
        console.log(error)
        throw new Error('Error updating user')
    }
}