"use client";
import { IUser } from "@/Models/userModel";
import { getpayments } from "@/Redux/features/devoteeThunk";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import React, { useEffect } from "react";

export interface Ipayments {
  totalAmount: number;
  total: number;
  _id: {
    userId: string;
    month: number;
    year: number;
  };
  user: IUser;
}

export interface stateValues {
  payments: Ipayments;
  loading : boolean;
  error : string;
}

function Page() {

  const dispatch = useAppDispatch()
  const { payments, loading, error } = useAppSelector(state => state.payments)
  useEffect(() => {
    dispatch(getpayments())
  }, []);

  if(error){
    return <h1>{error}</h1>
  }

  return (
    <div className="min-h-screen w-full mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Details</h1>
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="loader animate-spin border-4 border-blue-500 rounded-full h-12 w-12"></div>
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No payment records found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">Month</th>
                <th className="py-3 px-6 text-left">Year</th>
                <th className="py-3 px-6 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p: Ipayments, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-6 border-b border-gray-200">
                    {p.user.Id}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {p._id.month}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {p._id.year}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {p.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Page;
