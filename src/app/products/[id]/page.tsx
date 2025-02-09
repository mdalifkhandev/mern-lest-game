'use client';

import { useGetSingleProducts } from "@/src/hooks/products.hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../signup/loading";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useAddCardCreate } from "@/src/hooks/addcard.hooks";
import { getCurrentUser } from "@/src/server/AuthServer";

type TUser = {
    name: string;
    email: string;
    role: string;
    id: string;
}

const ProductDetails = () => {
    const { id } = useParams();
    const { data } = useGetSingleProducts(id as string);
    const product = data?.data;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const { mutate: addToCardData } = useAddCardCreate()
    const [user, setUser] = useState<TUser | null>();

    useEffect(() => {
        setIsClient(true);
        const user = async () => {
            const currentUser = await getCurrentUser()
            setUser(currentUser);
        }
        user()
    }, []);

    const handelAddCard = () => {
        if(!user){
            return alert("Please login to add product to cart")
        }
        const cardData = {
            ...product,
            userId: user.id,
            category: product.category._id,
            // _id: product._id,
        }
        delete cardData._id
        console.log(cardData);
        addToCardData(cardData)

    };



    if (!product) {
        return <Loading />;
    }

    if (!isClient) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-gray-800 shadow-lg rounded-lg">
            {/* Left Side - Image Gallery */}
            <div className="relative">
                <div className="w-full h-96 flex items-center justify-center dark:bg-gray-600  rounded-lg overflow-hidden">
                    <Image
                        src={product?.productImages[currentIndex]}
                        alt={product?.productName}
                        width={500}
                        height={500}
                        className="object-cover"
                    />
                </div>
                <div className="flex justify-center mt-2 gap-2">
                    {product?.productImages.map((image: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-16 h-16 border-2 rounded-md overflow-hidden ${currentIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
                        >
                            <Image src={image} alt="Thumbnail" width={60} height={60} className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-2">{product?.productName}</h1>
                <p className=" mb-2">Category: {product?.category?.catagoryName}</p>
                <p className="text-xl font-semibold text-green-600 mb-4">${product?.price}</p>
                <p className=" mb-4">{product?.description}</p>
                <p className="text-sm mb-4">Stock: {product?.stockQuantity} available</p>

                {/* Buttons */}
                <div className="flex gap-4">
                    {/* <Button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Buy Now</Button> */}
                    <Button onPress={handelAddCard} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
