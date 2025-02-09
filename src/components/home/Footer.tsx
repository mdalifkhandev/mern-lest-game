"use client"

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        {/* Logo and Name */}
        <div>
          <h2 className="text-xl font-bold">EveryThing</h2>
          <p className="text-sm mt-2">Providing quality services since 2025.</p>
        </div>

        {/* Links Section 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <nav className="flex flex-col space-y-2">
            <a href="/" className="hover:text-gray-400">Home</a>
            <a href="/products" className="hover:text-gray-400">Products</a>
          </nav>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
          </nav>
        </div>

        {/* Important Information */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Information</h3>
          <p className="text-sm">Address: 1234 Street Name, City, Country</p>
          <p className="text-sm">Email: contact@yourcompany.com</p>
          <p className="text-sm mt-4">&copy; {year} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
