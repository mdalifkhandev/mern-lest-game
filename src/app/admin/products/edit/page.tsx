'use client'

import Loading from "@/src/app/signup/loading";
import { useDeleteProduct, useGetAllProducts } from "@/src/hooks/products.hooks";
import { useGetAllUsers } from "@/src/hooks/user.hooks";
import Swal from "sweetalert2";

type TTableData = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  productImages: string[];
  isDeleted: boolean;
};

const page = () => {
  const { data, isLoading, error } = useGetAllProducts();
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

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Images & Actions</th>
            {/* <th className="border border-gray-300 px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {datas.map((item: TTableData, index: number) => (
            <tr key={index} className="hover:bg-gray-50 hover:text-black">
              <td className="border border-gray-300 px-4 py-2">{item.productName}</td>
              <td className="border border-gray-300 px-4 py-2">{item.description}</td>
              {/* <td className="border border-gray-300 px-4 py-2">${item?.price}</td> */}
              <td className="border border-gray-300 px-4 py-2">${item?.price.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{item.stockQuantity}</td>
              <td className="border border-gray-300 px-4 py-2">{item.category}</td>
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
    </div>
  );
};

export default page;