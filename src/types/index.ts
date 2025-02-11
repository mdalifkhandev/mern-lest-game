import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type IUser = {
  name: string;
  role: string;
  email: string;
};

export type ProductData = {
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  productImages: string[];
  isDeleted: boolean;
};
