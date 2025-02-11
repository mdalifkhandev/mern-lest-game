"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import Swal from "sweetalert2";
import {
  catagoryCreate,
  catagoryDelete,
  catagoryUpdate,
  getAllCatagory,
  getSingleCatagory,
} from "../server/catagory/catagoryManagement";

export const useCatagoryCreate = () => {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["CATAGORY"] });
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

export const useGetSingleCatagory = (id: string) => {
  return useQuery({
    queryKey: ["CATAGORY", id],
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      return await getSingleCatagory(id);
    },
  });
};

export const useCatagoryUpdate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CATAGORY", id],
    mutationFn: async (data) => {
      console.log(data, id);
      catagoryUpdate(id, data);
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Catagory updated",
        text: "Catagories updated successfully",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["CATAGORY"] });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: `Error updating product: ${error.message}`,
        icon: "error",
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["CATAGORY"],
    mutationFn: async (id) => {
      catagoryDelete(id);
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Catagory deleted",
        text: "Catagories deleted successfully",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["CATAGORY"] });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: `Error deleting product: ${error.message}`,
        icon: "error",
      });
    },
  });
};
