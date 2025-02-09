import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addCardCreate, getAllCards, updathAddcard } from "../server/addcard/AddCardManagement"
import Swal from "sweetalert2"

export const useAddCardCreate = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, any>({
        mutationKey: ['CARTITEM'],
        mutationFn: async (cardData) => await addCardCreate(cardData),
        onSuccess: (data) => {
            Swal.fire({
                icon: 'success',
                title: `${data.message || 'Card Added Successfully'}`,
                text: 'Card Added Successfully',
            });
            queryClient.invalidateQueries({ queryKey: ['CARTITEM'] });
        },
    })
}

export const useGetAllCards = (id:string) => {
    return useQuery({
        queryKey: ['CARTITEM',id],
        queryFn: async () => await getAllCards(id),
    })
}


export const useUpdathAddcard=()=>{
    const queryClient = useQueryClient()
    return useMutation<any, Error, any>({
        mutationKey: ['CARTITEM'],
        mutationFn: async (data:any) => await updathAddcard(data),
        onSuccess: (data) => {
            Swal.fire({
                icon: 'success',
                title: `${data.message || 'Card Added Successfully'}`,
                text: 'Card Added Successfully',
            });
            queryClient.invalidateQueries({ queryKey: ['CARTITEM'] });
        },
    })
}