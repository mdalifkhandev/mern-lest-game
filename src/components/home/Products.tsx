"use client";

import Card from "@/src/components/products/Card";
import { useGetAllProducts } from "@/src/hooks/products.hooks";
import React, { useState } from "react";

interface Product {
  _id: string;
  productName: string;
  productImages: string[];
  price: number;
  stockQuantity: number;
}

const Products = () => {
  const { data, error, isLoading } = useGetAllProducts({
    page: 1,
    limit: 8,
  });

  const products: Product[] = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search & Filter Controls */}

      <h1 className="text-2xl font-bold text-center my-5">Products</h1>

      {/* Product List */}
      {isLoading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error.message}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
