"use client";

import Loading from "@/src/app/signup/loading";
import {
  useCatagoryUpdate,
  useGetSingleCatagory,
} from "@/src/hooks/catagory.hooks";
import { Button } from "@heroui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = useGetSingleCatagory(id);
  const category = data?.data;
  const navigate = useRouter();
  const [isDeleted, setIsDeleted] = useState<boolean>();

  const { mutate: updateCategory, isSuccess, isPaused } = useCatagoryUpdate(id);

  const [formData, setFormData] = useState({
    catagoryName: "",
  });

  console.log("category", category);

  // Populate formData when category data is loaded
  useEffect(() => {
    if (category) {
      setFormData({
        catagoryName: category.catagoryName || "",
      });
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      setIsDeleted(category.isDeleted || false);
    }
  }, [category]);

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
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Are you sure you want to update this category?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateCategory(formData);
          navigate.push("/admin/catagory/edit");
          Swal.fire({
            title: "Updated!",
            text: "Category updated successfully.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "Your category is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleUnDeleteCatagory = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Are you sure in un-deleting the product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, un-delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateCategory({ isDeleted: false });
          setIsDeleted(false);
          navigate.push("/admin/catagory/edit");
          Swal.fire({
            title: "Un-deleted!",
            text: "Product un-deleted successfully.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "Your product is safe :)",
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
          Update Category
        </h1>

        {/* Category Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="catagoryName"
            value={formData.catagoryName} // Controlled input
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter category name"
          />
        </div>

        {isDeleted && (
          <Button
            onPress={handleUnDeleteCatagory}
            className="bg-green-500 hover:bg-green-600 mb-6"
          >
            Un-delete Category
          </Button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default Page;
