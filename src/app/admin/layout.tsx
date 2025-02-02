"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

interface Route {
    name: string;
    href?: string;
    subRoutes?: Route[];
}

const Layout = ({ children }: { children: ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [expandedRoute, setExpandedRoute] = useState<string | null>(null); // Track expanded route

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubRoutes = (routeName: string) => {
        // Toggle expanded route
        setExpandedRoute((prev) => (prev === routeName ? null : routeName));
    };

    const routes: Route[] = [
        {
            name: "User",
            subRoutes: [
                { name: "Create", href: "/admin/user/create" },
                { name: "Edit", href: "/admin/user" },
            ],
        },
        {
            name: "Products",
            subRoutes: [
                { name: "Create", href: "/admin/products/create" },
                { name: "Edit", href: "/admin/products/edit" },
            ],
        },
        {
            name: "Catagory",
            subRoutes: [
                { name: "Create", href: "/admin/catagory/create" },
                { name: "Edit", href: "/admin/catagory/edit" },
            ],
        },
        { name: "Contact", href: "/admin" },
    ];

    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div
                    className={`${isMenuOpen ? 'block' : 'hidden'} md:block p-4 md:col-span-2 bg-gray-50 dark:bg-gray-800 shadow-lg md:rounded-r-lg`}
                >
                    <div className="sticky top-4">
                        {routes.map((route) => (
                            <div key={route.name}>
                                {route.href ? (
                                    <Link
                                        href={route.href}
                                        className="block p-3 mb-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:translate-x-2 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        {route.name}
                                    </Link>
                                ) : (
                                    <div
                                        onClick={() => toggleSubRoutes(route.name)}
                                        className="p-3 mb-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 cursor-pointer flex justify-between items-center"
                                    >
                                        <span>{route.name}</span>
                                        {expandedRoute === route.name ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2.5"
                                                stroke="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 19.5 8.25 12l7.5-7.5"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                )}
                                {route.subRoutes && expandedRoute === route.name && (
                                    <div className="pl-4">
                                        {route.subRoutes.map((subRoute) => (
                                            <Link
                                                href={subRoute.href!}
                                                key={subRoute.href}
                                                className="block p-3 mb-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:translate-x-2 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {subRoute.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6 md:col-span-10 bg-white dark:bg-gray-800 shadow-lg md:rounded-l-lg">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;