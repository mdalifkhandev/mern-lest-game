'use client';

import { useGetAllCards, useUpdathAddcard } from '@/src/hooks/addcard.hooks';
import { Button } from '@heroui/button';
import { Image } from '@heroui/image';
import React, { useEffect, useState } from 'react';
import Loading from '../signup/loading';
import { getCurrentUser } from '@/src/server/AuthServer';

export default function CheckoutPage() {
    const [user, setUser] = useState<any | null>(null);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const { mutate: addCardUpdath } = useUpdathAddcard()

    // Fetch user on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    // Ensure we only fetch cards when user is available
    const { data, isLoading, error } = useGetAllCards(user?.id || '');

    // Initialize quantity state when products are loaded
    useEffect(() => {
        if (data?.data?.length > 0) {
            const initialQuantities: { [key: string]: number } = {};
            data.data.forEach((product: any) => {
                if (!product.isDeleted) {
                    initialQuantities[product._id] = 1; // Default quantity is 1 for non-deleted products
                }
            });
            setQuantities(initialQuantities);
        }
    }, [data]);

    if (!user || isLoading) {
        return <Loading />;
    }

    if (error) {
        return <p className="text-red-600">Error loading products.</p>;
    }

    const products = data?.data || [];

    // Function to update quantity
    const updateQuantity = (id: string, change: number) => {
        setQuantities((prev) => {
            const newQuantity = Math.max(1, (prev[id] || 1) + change);
            return { ...prev, [id]: newQuantity };
        });
    };

    // Calculate total price, VAT, and tax (excluding deleted products)
    const subtotal = products.reduce((acc: number, product: any) => {
        if (!product.isDeleted) {
            return acc + (product.price * (quantities[product._id] || 1));
        }
        return acc;
    }, 0);
    const vat = subtotal * 0.025; // 15% VAT
    const tax = subtotal * 0.025; // 5% Tax
    const total = subtotal + vat + tax;

    const handleDelete = (id: string) => {
        const data = {
            id,
            isDeleted: true
        }
        addCardUpdath(data)

    }

    const handleUndoDelete=(id:string)=>{
        const data = {
            id,
            isDeleted: false
        }
        addCardUpdath(data)
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side - Product List */}
                <div className="space-y-4">
                    {products.length > 0 ? (
                        products.map((product: any, index: number) => (
                            <>
                                <div key={index}>
                                    {product.isDeleted && (
                                        <button
                                            className="px-3 py-1  bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                            onClick={() => handleUndoDelete(product._id)}
                                        >
                                            Undo Delete
                                        </button>
                                    )}
                                </div>
                                <div
                                    key={product._id}
                                    className={`border rounded-xl shadow-md p-4 relative 
                                    ${product.isDeleted ? 'pointer-events-none opacity-50' : ''}`}
                                    style={product.isDeleted ? { filter: 'blur(5px)' } : {}}
                                >
                                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                                    <div className="flex space-x-4">
                                        <Image
                                            src={product?.productImages?.[0] || '/placeholder.png'}
                                            alt={product?.productName || 'Product Image'}
                                            width={100}
                                            height={100}
                                            className="rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium">{product?.productName}</h3>
                                            <p className="text-sm text-gray-600">{product?.description}</p>
                                            <p className="text-lg font-bold text-green-600">${product?.price}</p>
                                            <p className="text-sm text-gray-500">In Stock: {product?.stockQuantity}</p>

                                            {/* Quantity Controls (Hidden for Deleted Products) */}
                                            {!product.isDeleted && (
                                                <div className="flex  items-center mt-2">
                                                    <button
                                                        className="px-3 mr-7 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                                                        onClick={() => handleDelete(product._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="px-3 py-1 bg-gray-600 rounded-md"
                                                        onClick={() => updateQuantity(product._id, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4">{quantities[product._id] || 1}</span>
                                                    <button
                                                        className="px-3 py-1 bg-gray-600 rounded-md"
                                                        onClick={() => updateQuantity(product._id, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <p className="text-gray-500">No products in your cart.</p>
                    )}
                </div>

                {/* Right Side - Summary Section */}
                <div className="border rounded-xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">Summary</h2>
                    <div className="text-lg font-medium">
                        <p>Subtotal: <span className="float-right">${subtotal.toFixed(2)}</span></p>
                        <p>VAT (2.5%): <span className="float-right">${vat.toFixed(2)}</span></p>
                        <p>Tax (2.5%): <span className="float-right">${tax.toFixed(2)}</span></p>
                        <hr className="my-2" />
                        <p className="text-xl font-bold">Total: <span className="float-right">${total.toFixed(2)}</span></p>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl mt-4">
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
