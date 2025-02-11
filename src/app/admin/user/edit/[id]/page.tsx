"use client";

import Loading from "@/src/app/signup/loading";
import { useGateSingleUser, useUserUpdathe } from "@/src/hooks/user.hooks";
import { Button } from "@heroui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = useGateSingleUser(id);
  const user = data?.data;
  const navigate = useRouter();

  const { mutate: updathData, isSuccess, isPaused } = useUserUpdathe(id);

  const [isDeleted, setIsDeleted] = useState<boolean>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Populate formData when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setIsDeleted(user.isDeleted || false);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // updathData(formData);
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Are you sure in User Updathed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Updathed it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updathData(formData);
          navigate.push("/admin/user");
          Swal.fire({
            title: "Updathed!",
            text: "User Updath Successfully.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "Your file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleUnBlockUser = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Are you sure in User UnBlockd!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, UnBlock it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updathData({ isDeleted: false });
          setIsDeleted(false);
          navigate.push("/admin/user");
          Swal.fire({
            title: "Un Blocked!",
            text: "User Un Blocked Successfully.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "Your file is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (isLoading && !data) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Update User
        </h1>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name} // Controlled input
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email} // Controlled input
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Role Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role || ""} // Controlled input
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">
              {formData.role ? formData.role.toUpperCase() : "Select a role"}
            </option>
            <option value="admin">ADMIN</option>
            <option value="user">USER</option>
          </select>
        </div>

        {/* Conditional Unblock Button */}
        {isDeleted && (
          <Button
            onPress={handleUnBlockUser}
            className="bg-green-500 hover:bg-green-600 mb-6"
          >
            User Unblock
          </Button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default Page;
