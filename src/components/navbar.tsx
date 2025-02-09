"use client"


import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import logos from '@/src/asseds/FB-logo-128px.webp'

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import {
  GithubIcon,
  SearchIcon,
} from "@/src/components/icons";
import { Image } from "@heroui/image";
import { useUser } from "../contex/user.provider";
import { useRouter } from "next/navigation";
import { logoutUser } from "../server/AuthServer";

export const Navbar = () => {
  const { user, setIsLoading } = useUser();
  const router = useRouter()
  const handleLogout = async () => {
    setIsLoading(true)
    await logoutUser()
    router.push("/login")
  }

  const handleLogin = () => {
    setIsLoading(true)
    router.push("/login")
  }


  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );



  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt="HeroUI hero Image"
              src={logos.src}
              width={50}
            />
            <p className="font-bold text-inherit">EveryThing</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        
        <ThemeSwitch />
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        <NavbarItem className="hidden md:flex">
          {
            user ? <Button onPress={handleLogout} >Logout</Button> : <Button onPress={handleLogin}>Login</Button>
          }
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
       
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {
            user ? <Button onPress={handleLogout} >Logout</Button> : <Button onPress={handleLogin}>Login</Button>
          }
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
