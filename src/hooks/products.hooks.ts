import { useMutation } from "@tanstack/react-query"
import { FieldValues } from "react-hook-form"
import { productsCreate } from "../server/productsManagement/ProductsManagement"
import Swal from "sweetalert2"

export const useProductsCreate= () => {
    return useMutation<any,Error,FieldValues>({
        mutationKey:['PRODUCTS'],
        mutationFn: async (data) => {
            productsCreate(data)
        },
        onSuccess: (data) => {
            Swal.fire({
                title: 'Producto created',
                text: 'Products created successfully',
                icon: 'success',
            })
        },
        onError: (error) => {
            Swal.fire({
                title: 'Error',
                text: `Error creating product: ${error.message}`,
                icon: 'error',
                
            })
        }
    })
}