"use client";

import { useGetAllCatagory } from "@/src/hooks/catagory.hooks";
import { useProductsCreate } from "@/src/hooks/products.hooks";
import uploadImageToImageBB from "@/src/utils/uplodeImage";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

export default function CreateProducts() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { data } = useGetAllCatagory();
  const catagorys = data?.data;

  const { mutate: productsCreate } = useProductsCreate();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
    productImages: [] as string[], // Store multiple image URLs
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImages = async () => {
    try {
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadImageToImageBB(file)),
      );
      return imageUrls;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Image upload failed",
        text: error.message,
      });
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.productName || formData.productName.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Product name must be at least 3 characters long",
      });
      return;
    }

    if (!formData.description || formData.description.length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Description must be at least 10 characters long",
      });
      return;
    }

    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Price must be a valid positive number",
      });
      return;
    }

    if (
      !formData.stockQuantity ||
      isNaN(Number(formData.stockQuantity)) ||
      Number(formData.stockQuantity) < 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Stock quantity must be a valid non-negative number",
      });
      return;
    }

    if (!formData.category) {
      Swal.fire({
        icon: "warning",
        title: "Please select a category",
      });
      return;
    }

    if (imageFiles.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please upload at least one product image",
      });
      return;
    }

    try {
      // Upload images and get their URLs
      const imageUrls = await uploadImages();

      // Update form data with the uploaded image URLs
      const updatedFormData = {
        ...formData,
        productImages: imageUrls,
      };

      // Submit the form data (e.g., send to your backend API)
      console.log("Form Data with Image URLs:", updatedFormData);
      productsCreate(updatedFormData);

      Swal.fire({
        icon: "success",
        title: "Product created successfully!",
      });
    } catch (error) {
      console.error("Error uploading images or creating product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to create product. Please try again.",
      });
    }
  };
  console.log(formData);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Create Product
        </h1>

        {/* Form Fields in 2 Columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Product Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Price Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product price"
            />
          </div>

          {/* Stock Quantity Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Category Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData?.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {catagorys?.map(
                (catagory: { _id: string; catagoryName: string }) => (
                  <option key={catagory._id} value={catagory._id}>
                    {catagory.catagoryName}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        {/* Description Field (Full Width) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product description"
            rows={4}
          />
        </div>

        {/* Product Images Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <div className="min-w-fit flex-1">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              Upload image
            </label>
            <input
              multiple
              className="hidden"
              id="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-6 gap-4 my-5">
            {imagePreviews.map((imageDataUrl, index) => (
              <div
                key={imageDataUrl}
                className="relative size-32 rounded-xl border-2 border-dashed border-default-300 p-2"
              >
                {/* Image Preview */}
                <img
                  alt="item"
                  className="h-full w-full object-cover object-center rounded-md"
                  src={imageDataUrl}
                />

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => {
                    const updatedPreviews = [...imagePreviews];
                    updatedPreviews.splice(index, 1);
                    setImagePreviews(updatedPreviews);

                    const updatedFiles = [...imageFiles];
                    updatedFiles.splice(index, 1);
                    setImageFiles(updatedFiles);
                  }}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
