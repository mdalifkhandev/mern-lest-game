"use client";

import { useUserRegistration } from "@/src/hooks/auth.hooks";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CreateUser() {
  const { mutate: createUser } = useUserRegistration();

  const roles = ["admin", "user"];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "passwords do not match",
      });
      return;
    }
    if (formData.password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "password must be at least 6 characters long",
      });
      return;
    }

    if (formData.name.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "name must be at least 3 characters long",
      });
      return;
    }

    if (formData.role !== "admin" && formData.role !== "user") {
      Swal.fire({
        icon: "warning",
        title: "role must be admin or user",
      });
      return;
    }
    createUser(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Create User
        </h1>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        {/* Role Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
