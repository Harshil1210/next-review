"use client";
import { IUser } from "@/Models/userModel";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    async function getUserProfile() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/devotee/profile`
      );
      const json = response.data;
      setUser(json.user);
    }

    getUserProfile();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      {!user ? (
        <div className="loader"></div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <div className="flex flex-col items-center">
            <img
              alt=""
              src={`${process.env.NEXT_PUBLIC_S3_IMAGE_URL}${user?.photo}`}
              className="rounded-full w-32 h-32 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              {user?.firstName} {user?.middleName} {user?.lastName}
            </h2>
            <div className="text-gray-600 mb-1">{user?.flatnumber}</div>
            <div className="text-gray-600 mb-1">{user?.area}</div>
            <div className="text-gray-600 mb-1">{user?.city}</div>
            <div className="text-gray-600 mb-1">{user?.state}</div>
            <div className="text-gray-600 mb-1">{user?.pinCode}</div>
            <div className="text-gray-600 mb-4">{user?.email}</div>
            <div className="text-gray-500">
              Initiation Date: {new Date(user?.initiationDate || "").toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
