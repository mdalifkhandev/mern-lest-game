import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUsers, getSingleUser, updateUser } from "../server/userManagement/user.management";
import Swal from "sweetalert2";


export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ['GET_ALL_USER'],
        queryFn: async () => await getAllUsers(),
    });
};

export const useGateSingleUser=(id:string)=>{
    return useQuery({
        queryKey:['GET_SINGLE_USER',id],
        queryFn: async ({queryKey}) => {
            const [_key,id]=queryKey
            return await getSingleUser(id)
        },
    })
}

export const useDeletedUser = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await deleteUser(id),
        onSuccess: () => {
            // Swal.fire({
            //     title: "Success",
            //     text: "User Deleted Successfully",
            //     icon: "success",
            //     confirmButtonText: "OK",
            // })

            queryClient.invalidateQueries({ queryKey: ["GET_ALL_USER"] })
        }

    });
}


export const useUserUpdathe = (id:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => await updateUser(id,data),
        onSuccess: () => {
            // Swal.fire({
            //     title: "Success",
            //     text: "User Updated Successfully",
            //     icon: "success",
            // })

            queryClient.invalidateQueries({ queryKey: ["GET_ALL_USER"] })
        }

    });
}