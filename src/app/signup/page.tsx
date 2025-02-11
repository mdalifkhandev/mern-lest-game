"use client";

import { useUserRegistration } from "@/src/hooks/auth.hooks";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUserRegistration(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, redirect, router]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign up to get started!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full mt-1 p-3 border rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-1 p-3 border rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full mt-1 p-3 border rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full mt-1 p-3 border rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
