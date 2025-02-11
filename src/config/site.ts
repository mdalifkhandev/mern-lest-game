import { getCurrentUser } from "../server/AuthServer";

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "MY Cart",
      href: "/cart",
    },
    {
      label: "Admin",
      href: "/admin",
    },
  ],
};
