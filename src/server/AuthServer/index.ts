"use server"


import axiosInstance from "@/src/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser=async(userData:FieldValues)=>{
    try{
        const {data}=await axiosInstance.post('/auth/creat',userData)
        if(data.success){
           (await cookies()).set('refreshToken',data.data.refreshToken);
           (await cookies()).set('accessToken',data.data.accessToken)
        }
        return data
    } catch (error:any) {
        console.log(error.response);
        throw new Error(error)
        
    }
}


export const loginUser=async(userData:FieldValues)=>{
    try{
        const {data}=await axiosInstance.post('/auth/login',userData)
        if(data.success){
           (await cookies()).set('refreshToken',data.data.refreshToken);
           (await cookies()).set('accessToken',data.data.accessToken)
        }
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error))
    }
}

export const logoutUser=async()=>{
    (await cookies()).delete('refreshToken');
    (await cookies()).delete('accessToken')
}


export const getCurrentUser=async()=>{
    const accessToken=(await cookies()).get('accessToken')?.value
    let decoded=null
    if(accessToken){
        decoded=await jwtDecode(accessToken)

        return {
            name:decoded.name,
            email:decoded.email,
            role:decoded.role
        }
    }
    return decoded
}



export const getNewAccessToken=async()=>{
    try{
        const refreshToken=(await cookies()).get('refreshToken')?.value
        const res=await axiosInstance({
            url:'/auth/login',
            method:'post',
            withCredentials:true,
            headers:{
                cookie:`refreshToken=${refreshToken}`
            }
        })
        return res.data
    }
    catch(error){
        console.log(error)
    }
}


