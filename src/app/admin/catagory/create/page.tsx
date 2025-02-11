"use client";

import { useState, useEffect } from "react";
import { useCatagoryCreate } from "@/src/hooks/catagory.hooks";

export default function CreateCategory() {
  const { mutate: createCategory } = useCatagoryCreate();
  const [catagoryName, setCatagoryName] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (catagoryName.trim()) {
      createCategory({ catagoryName });
      setCatagoryName("");
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md dark:bg-gray-700"
      >
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Create Category
        </h1>
        <input
          type="text"
          name="catagoryName"
          value={catagoryName}
          onChange={(e) => setCatagoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>
    </div>
  );
}
