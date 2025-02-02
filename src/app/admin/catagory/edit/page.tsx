'use client';


import Loading from "@/src/app/signup/loading";
import { useGetAllCatagory } from "@/src/hooks/catagory.hooks";
import Swal from "sweetalert2";

type TCategoryData = {
  _id: string;
  catagoryName: string;
  isDeleted: boolean;
};

const Page = () => {
  const { data, isLoading, error } = useGetAllCatagory();
  console.log(data);
  
//   const { mutate: deleteCategory, error: deleteError } = useDeleteCategory();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
  });

  const handleDeleteCategory = (id: string) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this category?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
        //   deleteCategory(id);
          Swal.fire({
            title: "Deleted!",
            text: "Category Deleted Successfully.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "Category is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data?.data;
  

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">SN NO</th>
            <th className="border border-gray-300 px-4 py-2">Category Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item: TCategoryData, index: number) => (
            <tr key={index} className="hover:bg-gray-50 hover:text-black">
              <td className="border border-gray-300 px-4 py-2">{item.catagoryName              }</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center items-center gap-4">
                <button
                  onClick={() => (window.location.href = `/admin/category/edit/${item._id}`)}
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
                    onClick={() => handleDeleteCategory(item._id)}
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

export default Page;