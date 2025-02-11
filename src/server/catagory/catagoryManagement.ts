"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const catagoryCreate = async (catagoryData: FieldValues) => {
  try {
    const res = await axiosInstance.post("/catagory/create", catagoryData);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getAllCatagory = async () => {
  try {
    const res = await axiosInstance.get("/catagory");
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getSingleCatagory = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/catagory/${id}`);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const catagoryUpdate = async (id: string, catagoryData: FieldValues) => {
  try {
    const res = await axiosInstance.patch(`/catagory/${id}`, catagoryData);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const catagoryDelete = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/catagory/${id}`);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
