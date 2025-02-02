"use client";

import Loading from '@/src/app/signup/loading';
import envConfig from '@/src/config/envConfig';
import { useGetSingleProducts, useUpdateProduct } from '@/src/hooks/products.hooks';
import { Button } from '@heroui/button';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Page = () => {
    const params=useParams();
    const id = params.id as string;
    const { data, isLoading, error } = useGetSingleProducts(id);
    const {mutate:updateProduct}=useUpdateProduct(id);
    const product = data?.data;
    const navigate = useRouter();

    const [isDeleted, setIsDeleted] = useState<boolean>();
    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        category: "",
        productImages: [] as string[],
        isDeleted: false
    });

    // Populate formData when product data is loaded
    useEffect(() => {
        if (product) {
            setFormData({
                productName: product.productName || "",
                description: product.description || "",
                price: product.price || 0,
                stockQuantity: product.stockQuantity || 0,
                category: product.category || "",
                productImages: product.productImages || [],
                isDeleted: product.isDeleted || false,
            });
        }
    }, [product]);

    useEffect(() => {
        if (product) {
            setIsDeleted(product.isDeleted || false);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Upload images to ImageBB
    const uploadImageToImageBB = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${envConfig.imageBBKey}`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.data && result.data.url) {
                return result.data.url; // Return the uploaded image URL
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to upload image. Please try again.',
                icon: 'error',
            });
            return null;
        }
    };

    // Handle adding new images
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            // Upload each file to ImageBB and get the URLs
            const uploadedImageUrls = await Promise.all(
                files.map(async (file) => {
                    const url = await uploadImageToImageBB(file);
                    return url;
                })
            );

            // Filter out null values (failed uploads)
            const validImageUrls = uploadedImageUrls.filter((url) => url !== null) as string[];

            // Update the formData state with the new image URLs
            setFormData((prevData) => ({
                ...prevData,
                productImages: [...prevData.productImages, ...validImageUrls],
            }));
        }
    };

    // Handle deleting an image
    const handleDeleteImage = (index: number) => {
        const updatedImages = formData.productImages.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            productImages: updatedImages,
        }));
    };

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "Are you sure in updating the product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                updateProduct(formData);
                console.log(formData);
                navigate.push("/admin/products/edit");
                Swal.fire({
                    title: "Updated!",
                    text: "Product updated successfully.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your product is safe :)",
                    icon: "error"
                });
            }
        });
    };

    const handleUnDeleteProduct = () => {
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "Are you sure in un-deleting the product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, un-delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                updateProduct({ ...formData, isDeleted: false });
                setIsDeleted(false);
                navigate.push("/admin/products/edit");
                Swal.fire({
                    title: "Un-deleted!",
                    text: "Product un-deleted successfully.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your product is safe :)",
                    icon: "error"
                });
            }
        });
    };

    if (isLoading && !data) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
            <form
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Update Product</h1>

                {/* Form Fields in 2 Columns */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Product Name Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
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
                        <label className="block text-sm font-medium text-gray-700">Price</label>
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
                        <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
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
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                            <option value="home">Home</option>
                        </select>
                    </div>
                </div>

                {/* Description Field (Full Width) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
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
                    <label className="block text-sm font-medium text-gray-700">Product Images</label>
                    <input
                        type="file"
                        name="productImages"
                        multiple
                        onChange={handleImageChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="mt-2 grid grid-cols-5 gap-2">
                        {formData.productImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-full h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conditional Un-delete Button */}
                {isDeleted && (
                    <Button onPress={handleUnDeleteProduct} className="bg-green-500 hover:bg-green-600 mb-6">
                        Un-delete Product
                    </Button>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default Page;