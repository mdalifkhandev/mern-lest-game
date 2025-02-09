"use client";

import Card from "@/src/components/products/Card";
import { useGetAllCatagory } from "@/src/hooks/catagory.hooks";
import { useGetAllProducts } from "@/src/hooks/products.hooks";
import {  CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

interface Product {
    _id: string;
    productName: string;
    productImages: string[];
    price: number;
    stockQuantity: number;
}

const Products = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [category, setCategory] = useState("");
    const {data:catagoryDataGet}=useGetAllCatagory()

    const { data, error, isLoading } = useGetAllProducts({
        page,
        limit,
        searchTerm: debouncedSearchTerm,
        category,
    });

    const products: Product[] = data?.data || [];
    const totalPages = data?.meta?.totalPage || 1;

    const handleNextPage = () => setPage((prev) => (prev < totalPages ? prev + 1 : prev));
    const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Search & Filter Controls */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Products</h1>

                <div className="flex space-x-4">
                    {/* Search Field */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-lg px-3 py-2 w-64"
                    />

                    {/* Category Filter */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="">All Categories</option>
                        {catagoryDataGet?.data.map((catagory:any)=>(
                            <option key={catagory._id} value={catagory._id}>{catagory.catagoryName}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Product List */}
            {isLoading ? (
                <div className="text-center text-lg">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">Error: {error.message}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product._id} product={product} >
                            {/* <CardHeader className="text-lg font-semibold">{product.productName}</CardHeader>
                            <CardBody>
                                <Image
                                    src={product.productImages[0]}
                                    alt={product.productName}
                                    width={270}
                                    className="rounded-lg"
                                />
                            </CardBody>
                            <CardFooter className="flex justify-between">
                                <p className="font-bold">${product.price}</p>
                                <p className="text-gray-500">{product.stockQuantity} in stock</p>
                            </CardFooter> */}
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <div className="flex items-center space-x-2">
                    <span>Show:</span>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span>products per page</span>
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        Previous
                    </button>
                    <span className="text-lg font-semibold">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={page >= totalPages}
                        className={`px-4 py-2 rounded-lg ${page >= totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
