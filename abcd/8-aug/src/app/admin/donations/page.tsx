"use client";
import { IUser } from "@/Models/userModel";
import { Ipayments } from "@/app/devotee/mypayments/page";
import React, { useEffect, useState } from "react";

function Page() {
  const [donations, setDonations] = useState<Ipayments[]>([]);
  const [showPaid, setShowPaid] = useState<boolean>(true);
  const [showUnpaid, setShowUnpaid] = useState<boolean>(false);
  const [unpaidDonations, setUnpaidDonations] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getDonations() {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/donations`
      );
      const json = await response.json();
      setDonations(json.donations);

      const response2 = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/unpaidlist`
      );
      const json2 = await response2.json();
      setUnpaidDonations(json2.unpaidUsers);
      setLoading(false);
    }
    getDonations();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "allPayment") {
      setShowUnpaid(false);
      setShowPaid(true);
    } else {
      setShowPaid(false);
      setShowUnpaid(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold mb-4">Donations</h1>
      <select
        title="donationMenu"
        name="donationMenu"
        id="donationMenu"
        onChange={handleSelectChange}
        className="mb-4 border rounded-md p-2 bg-white shadow-sm"
      >
        <option value="allPayment">All Payments</option>
        <option value="unPaid">Unpaid Donations</option>
      </select>

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {showUnpaid && unpaidDonations.length > 0 && (
            <div className="overflow-x-auto w-full mb-6">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="py-2 px-4 border-b">User ID</th>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">Middle Name</th>
                    <th className="py-2 px-4 border-b">Flat Number</th>
                    <th className="py-2 px-4 border-b">Area</th>
                    <th className="py-2 px-4 border-b">State</th>
                    <th className="py-2 px-4 border-b">City</th>
                    <th className="py-2 px-4 border-b">PinCode</th>
                    <th className="py-2 px-4 border-b">Initiation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {unpaidDonations.map((unpaid: IUser, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.Id}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.firstName}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.lastName}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.middleName}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.flatnumber}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.area}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.state}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.city}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {unpaid.pinCode}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {new Date(unpaid.initiationDate)
                          .toISOString()
                          .substring(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {showPaid && donations.length > 0 && (
            <div className="overflow-x-auto w-full mb-6">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="py-2 px-4 border-b">User ID</th>
                    <th className="py-2 px-4 border-b">Month</th>
                    <th className="py-2 px-4 border-b">Year</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((paid: Ipayments, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-center">
                        {paid.user.Id}
                      </td>
                      <td className="py-2 px-4 border-b  text-center">
                        {paid._id.month}
                      </td>
                      <td className="py-2 px-4 border-b  text-center">
                        {paid._id.year}
                      </td>
                      <td className="py-2 px-4 border-b  text-center">
                        {paid.totalAmount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Page;
