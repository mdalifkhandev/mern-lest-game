'use client'

import Loading from "@/src/app/signup/loading";
import { useDeleteProduct, useGetAllProducts } from "@/src/hooks/products.hooks";
import Swal from "sweetalert2";
import { useState } from "react"; // Import useState for pagination

type TTableData = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: any;
  productImages: string[];
  isDeleted: boolean;
};

const page = () => {
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Set current page from meta data
  const [itemsPerPage, setItemsPerPage] = useState(10); // Set items per page from meta data
  
  const { data, isLoading, error } = useGetAllProducts({limit:itemsPerPage, page:currentPage});


  const { mutate: deletedProduct, error: deleteError } = useDeleteProduct();


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
  });

  const handleDeleteProduct = (id: string) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Are you sure in deleting the product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletedProduct(id);
          Swal.fire({
            title: "Deleted!",
            text: "Product Deleted Successfully.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "Your product is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const datas = data.data;
  const { total, totalPage } = data.meta; // Destructure meta data

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // You can also call your API here to fetch data for the new page
  };

  // Function to handle items per page change
  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1); // Reset to the first page when changing items per page
    // You can also call your API here to fetch data with the new limit
  };

  return (
    <div className="p-4">
      {/* Per Page Limit Dropdown */}
      <div className="flex justify-end mb-4">
        <label htmlFor="itemsPerPage" className="mr-2 text-gray-600">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">SN No </th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Images & Actions</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((item: TTableData, index: number) => (
            <tr key={index} className="hover:bg-gray-50 hover:text-black">
              <td className="border border-gray-300 px-4 py-2">{index+1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.productName}</td>
              <td className="border border-gray-300 px-4 py-2">{item.description}</td>
              <td className="border border-gray-300 px-4 py-2">${item?.price.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{item.stockQuantity}</td>
              <td className="border border-gray-300 px-4 py-2">{item?.category?.catagoryName}</td>
              <td className="border border-gray-300 px-4 py-2 grid grid-cols-3">
                {item?.productImages?.map((image, idx) => (
                  <img key={idx} src={image} alt={`Product Image ${idx + 1}`} className="w-10 h-10 inline-block m-1" />
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center items-center gap-4">
                <button
                  onClick={() =>
                    (window.location.href = `/admin/products/edit/${item._id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                {item.isDeleted ? (
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                    Deleted
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Unique Pagination Design */}
      <div className="flex justify-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Total Items Display */}
      <div className="text-center mt-4 text-gray-600">
        Showing page {currentPage} of {totalPage} (Total {total} items)
      </div>
    </div>
  );
};

export default page;