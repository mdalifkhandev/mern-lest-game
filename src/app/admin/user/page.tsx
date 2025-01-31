'use client'

import { useDeletedUser, useGetAllUsers } from "@/src/hooks/user.hooks";
import Loading from "../../signup/loading";



type TTableData = {
  _id:string;
  name: string;
  email: string;
  role: string;
  isDeleted: boolean;
}

const page = () => {

  const { data, isLoading, error } = useGetAllUsers();
  const {mutate: deletedUser,  error: deleteError } = useDeletedUser()

  if (isLoading) return <Loading/>
  if (error) return <p>Error: {error.message}</p>;

  const datas = data.data



  // const datas = [
  //   { name: "John Doe", email: "johndoe@example.com", role: "Admin" },
  //   { name: "Jane Smith", email: "janesmith@example.com", role: "Editor" },
  //   { name: "Mark Brown", email: "markbrown@example.com", role: "Viewer" },
  //   { name: "John Doe", email: "johndoe@example.com", role: "Admin" },
  //   { name: "Jane Smith", email: "janesmith@example.com", role: "Editor" },
  //   { name: "Mark Brown", email: "markbrown@example.com", role: "Viewer" },
  // ];

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border ">
        <thead>
          <tr >
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            datas.map((item: TTableData, index: number) => (
              <tr key={index} className="hover:bg-gray-50 hover:text-black">
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                <td className="border border-gray-300 px-4 py-2">{item.role}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center items-center gap-4`">
                  <button onClick={() => window.location.href = `/admin/user/edit/${item._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>


                  {
                    item.isDeleted ? <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                      Deleted
                    </button> 
                    : 
                    <button onClick={()=>deletedUser(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                      Delete
                    </button>
                  }


                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default page;
