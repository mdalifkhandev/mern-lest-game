import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { deleteProduct, getAllProducts, getSingleProduct, productsCreate, updateProduct } from "../server/productsManagement/ProductsManagement";
import Swal from "sweetalert2";
import { ProductData } from "../types";

export const useProductsCreate = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["PRODUCTS"],
        mutationFn: async (data) => {
            productsCreate(data);
        },
        onSuccess: (data) => {
            Swal.fire({
                title: "Product created",
                text: "Products created successfully",
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

export const useGetAllProducts = () => {
    return useQuery<any, Error>({
        queryKey: ["PRODUCTS"],
        queryFn: async () => {
            return await getAllProducts();
        },
    });
};


export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, string>({
        mutationFn: async (id) => {
             await deleteProduct(id);
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey:["PRODUCTS"]});
        },
    });
}


export const useGetSingleProducts=  (id:string) => {
    return useQuery({
        queryKey: ["PRODUCTS",id],
        queryFn: async ({ queryKey }) => {
            const [_key, id] = queryKey;
            return await getSingleProduct(id);
        },
    });
}


export const useUpdateProduct = (id:string) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, ProductData>({
        mutationFn: async (product) => {
            return await updateProduct(id,product);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["PRODUCTS"]});
        },
    });
}