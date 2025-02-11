import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { loginUser, registerUser } from "../server/AuthServer";
import Swal from "sweetalert2";

export const useUserRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: `${data.message || "User Registered Successfully"}`,
      });
      queryClient.invalidateQueries({ queryKey: ["USER_REGISTRATION"] });
    },
    onError: (error: any) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "User Registration Failed",
        text: error.message,
      });
    },
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "User Logged In Successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["USER_LOGIN"] });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "User Login Failed",
      });
    },
  });
};
