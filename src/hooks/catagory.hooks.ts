"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { FieldValues } from "react-hook-form"
import Swal from "sweetalert2";
import { catagoryCreate, getAllCatagory } from "../server/catagory/catagoryManagement";


export const useCatagoryCreate = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["CATAGORY"],
        mutationFn: async (data) => {
            catagoryCreate(data);
        },
        onSuccess: (data) => {
            Swal.fire({
                title: "Catagory created",
                text: "Catagories created successfully",
                icon: "success",
            });
        },
        onError: (error) => {
            Swal.fire({
                title: "Error",
                text: `Error creating product: ${error.message}`,
                icon: "error",
            });
        },
    });
};

export const useGetAllCatagory = () => {
    return useQuery<any, Error>({
        queryKey: ["CATAGORY"],
        queryFn: async () => {
            return await getAllCatagory();
        },
    });
};