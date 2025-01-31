import { useMutation, useQuery } from "@tanstack/react-query"
import { FieldValues } from "react-hook-form"
import { loginUser, registerUser } from "../server/AuthServer"
import Swal from "sweetalert2"

export const useUserRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ['USER_REGISTRATION'],
        mutationFn: async (userData) => await registerUser(userData),
        onSuccess: (data) => {
            console.log(data);

            Swal.fire({
                icon: 'success',
                title: `${data.message || 'User Registered Successfully'}`,
                // showConfirmButton:false,
                // timer:1500   ,
            })
        },
        onError: (error: any) => {
            console.log(error);

            Swal.fire({
                icon: 'error',
                title: 'User Registration Failed',
                text: error.message,
            })
        }
    })
}


export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ['USER_LOGIN'],
        mutationFn: async (userData) => await loginUser(userData),
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'User Logged In Successfully',
                // showConfirmButton:false,
                // timer:1500   ,
            })
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'User Login Failed',
            })
        }
    })
}

