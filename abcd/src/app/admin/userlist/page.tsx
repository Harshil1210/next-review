"use client";
import { IUser } from "@/Models/userModel";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { addEdituser } from "@/Redux/features/userSlice";
import { deleteUser, fetchUsers, fetchallUsers } from "@/Redux/features/userThunk";
function Page() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [originalUsers, setOriginalUsers] = useState<IUser[]>([]);
  const [searchtxt, setSearchtxt] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, userlist } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchallUsers())
  },[])

  useEffect(() => {
    console.log("fetchhing userss....");
    dispatch(fetchUsers({ pageNumber: currentPage, pageSize: itemsPerPage }));
  }, [currentPage]);

  useEffect(() => {
    console.log("setting users ....");
    setUsers(userlist);
    setOriginalUsers(userlist);
  }, [userlist]);

  if (error) {
    return <h1>{error}</h1>;
  }
  useEffect(() => {
    const handleSearch = () => {
      if (searchtxt.trim() === "") {
        setUsers(originalUsers);
      } else {
        const filteredUsers = originalUsers.filter((usr) =>
          JSON.stringify(usr).toLowerCase().includes(searchtxt.toLowerCase())
        );
        setUsers(filteredUsers);
      }
    };
    handleSearch();
  }, [searchtxt]);

  const editUser = (user: IUser) => {
    dispatch(addEdituser(user));
    router.push("/admin/edituser");
  };

  const deleteuser = (userId: string) => {
    dispatch(deleteUser(userId));
    toast.success("User deleted successfully");
  };

  const handleSortAsc = () => {
    const sortedUsers = [...users].sort((a: any, b: any) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  const handleSortDesc = () => {
    const sortedUsers = [...users].sort((a: any, b: any) => {
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return 1;
      return 0;
    });
    setUsers(sortedUsers);
  };

console.log("length :",userlist.length)

  return (
    <div className="min-h-screen w-full p-10">
      <div className="text-4xl text-center font-bold mb-10">Devotee list</div>
      <div>
        <button
          type="button"
          onClick={() => router.push("/admin/createuser")}
          id="userCreateBtn"
        ></button>
      </div>
      <div className="my-5 flex items-center justify-end space-x-2">
        <button
          type="button"
          id="sortByDesc"
          onClick={handleSortDesc}
          className="btn-sort bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          ⬆️
        </button>
        <button
          type="button"
          id="sortByAsc"
          onClick={handleSortAsc}
          className="btn-sort bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          ⬇️
        </button>
        <input
          type="text"
          id="searchInput"
          onChange={(e) => setSearchtxt(e.target.value)}
          value={searchtxt}
          className="px-4 py-2 border border-gray-300 rounded"
          placeholder="Search by Name"
        />
        <button
          id="searchBtn"
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="loader animate-spin border-4 border-blue-500 rounded-full h-12 w-12"></div>
        </div>
      ) : (
        <div className="my-10 overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">DevoteeId</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Middle Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">EmailId</th>
                <th className="px-4 py-2">Flat No</th>
                <th className="px-4 py-2">Area</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">Pincode</th>
                <th className="px-4 py-2">Initiation Date</th>
                <th className="px-4 py-2">Photo</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user: IUser, index: number) => (
                <tr className="border-b" key={index}>
                  <td className="px-4 py-2">{String(user.Id)}</td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.middleName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.flatnumber}</td>
                  <td className="px-4 py-2">{user.area}</td>
                  <td className="px-4 py-2">{user.city}</td>
                  <td className="px-4 py-2">{user.state}</td>
                  <td className="px-4 py-2">{user.pinCode}</td>
                  <td className="px-4 py-2">
                    {new Date(user.initiationDate)
                      .toISOString()
                      .substring(0, 10)}
                  </td>
                  <td className="px-4 py-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_IMAGE_URL}${user.photo}`}
                      alt=""
                      width={100}
                      height={100}
                      quality={100}
                      className="h-12 w-12 object-cover rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      type="button"
                      onClick={() => editUser(user)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      id={`deleteBtn-${user.Id}`}
                      onClick={() => deleteuser(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length > 1 && (
            <div className="flex justify-end items-center mt-4 text-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              >
                Prev
              </button>
              <div className="mx-2">{currentPage}</div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                // disabled={currentPage === totalPages}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
