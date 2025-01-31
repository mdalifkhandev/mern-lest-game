import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type IUser = {
  name:string,
  role:string,
  email:string,
}