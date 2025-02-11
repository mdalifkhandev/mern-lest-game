"use client";

import { useCatagoryCreate } from "@/src/hooks/catagory.hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CreateCategory() {
  const { mutate: createCategory } = useCatagoryCreate();
  const [formData, setFormData] = useState({
    catagoryName: "",
  });

  const navigate = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.catagoryName.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Category name must be at least 3 characters long",
      });
      return;
    }

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Are you sure in the Create Catagory?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Create it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          createCategory(formData);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "Catagory not Created :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Create Category
        </h1>

        {/* Category Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="catagoryName"
            value={formData.catagoryName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter category name"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Create Category
        </button>
      </form>
    </div>
  );
}
