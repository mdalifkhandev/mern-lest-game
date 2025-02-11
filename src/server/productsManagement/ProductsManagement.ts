"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const productsCreate = async (productsData: FieldValues) => {
  try {
    const res = await axiosInstance.post("/products/create", productsData);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

// export const getAllProducts=async(queryParams:Record<string,any>)=>{
//     const {page,limit,searchTerm,category}=queryParams
//     try {
//         const res=await axiosInstance.get(`/products?page=${page}&limit=${limit}&searchTerm=${searchTerm}&category=${category}`,)
//         return res.data
//     }catch(error:any){
//         console.log(error)
//         throw new Error(error.message)
//     }
// }
export const getAllProducts = async (queryParams: Record<string, any>) => {
  const { page, limit, ...restParams } = queryParams;

  // Only include non-empty parameters
  const filteredParams = Object.fromEntries(
    Object.entries(restParams).filter(
      ([_, value]) => value !== undefined && value !== "",
    ),
  );

  try {
    const res = await axiosInstance.get("/products", {
      params: { page, limit, ...filteredParams }, // Axios handles query params
    });

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/products/delete/${id}`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getSingleProduct = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/products/get/${id}`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updateProduct = async (id: string, productData: FieldValues) => {
  try {
    const res = await axiosInstance.patch(
      `/products/update/${id}`,
      productData,
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
