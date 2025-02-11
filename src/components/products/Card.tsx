import { Button } from "@heroui/button";
import {
  Card as MainCard,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/card";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";

const Card = ({ product }: { product: any }) => {
  const { productName, description, price, stockQuantity, productImages } =
    product;

  // Determine if the product is out of stock
  const isOutOfStock = stockQuantity <= 0;

  const navigate = useRouter();

  const handlePress = () => {
    navigate.push(`/products/${product._id}`);
  };

  return (
    <MainCard className="py-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-xl text-gray-300">{productName}</h4>
        {isOutOfStock && (
          <span className="text-sm text-red-500 mt-1">Out of Stock</span>
        )}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={
            productImages[0] ||
            "https://heroui.com/images/hero-card-complete.jpeg"
          } // Fallback image if imageUrl is not provided
          width={270}
          height={180}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start px-4">
        <div className="w-full">
          <p className="text-sm text-gray-300">{description}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="font-bold text-lg">${price}</p>
            {!isOutOfStock && (
              <p className="text-sm text-gray-500">
                {stockQuantity} left in stock
              </p>
            )}
          </div>
        </div>
        <Button
          onPress={handlePress}
          className={`mt-4 w-full ${
            isOutOfStock
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold py-2 rounded-lg transition-colors duration-300`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out of Stock" : "Details"}
        </Button>
      </CardFooter>
    </MainCard>
  );
};

export default Card;
