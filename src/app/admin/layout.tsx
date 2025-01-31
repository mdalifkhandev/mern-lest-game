"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

interface Route {
    name: string;
    href: string;
}

const Layout = ({ children }: { children: ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const routes: Route[] = [
        { name: "Create", href: "/admin/create" },
        { name: "User", href: "/admin/user" },
        { name: "Contact", href: "/admin" },
        { name: "Contact", href: "/admi" },
    ];

    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
                <h1 className="text-xl font-semibold">Admine Dasbord</h1>
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
                    className={`${
                        isMenuOpen ? 'block' : 'hidden'
                    } md:block p-4 md:col-span-2 bg-gray-50 dark:bg-gray-800 shadow-lg md:rounded-r-lg`}
                >
                    <div className="sticky top-4">
                        {routes.map((route) => (
                            <Link
                                href={route.href}
                                key={route.href}
                                className="block p-3 mb-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:translate-x-2 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {route.name}
                            </Link>
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
