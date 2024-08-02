"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { payonline } from "@/Actions/devoteeAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Inputs {
  month: string;
  year: string;
  amount: number;
}

function Page() {
  const months = [
    { value: "1", name: "Jan" },
    { value: "2", name: "Feb" },
    { value: "3", name: "Mar" },
    { value: "4", name: "Apr" },
    { value: "5", name: "May" },
    { value: "6", name: "Jun" },
    { value: "7", name: "Jul" },
    { value: "8", name: "Aug" },
    { value: "9", name: "Sep" },
    { value: "10", name: "Oct" },
    { value: "11", name: "Nov" },
    { value: "12", name: "Dec" },
  ];
  const years = [2020, 2021, 2022, 2023, 2024];

  const {
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onBlur" });

  const [state, formAction] = useFormState(payonline, undefined);
  const router = useRouter();
  useEffect(() => {
    if (state !== undefined) {
      if (state.message === "success") {
        toast.success(state.message);
        setTimeout(() => {
          router.push("/devotee/mypayments");
        }, 1000);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Pay Online</h1>
        <form action={formAction}>
          <div className="mb-4">
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700"
            >
              Month
            </label>
            <select
              id="month"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("month", {
                required: { value: true, message: "Month is required" },
              })}
            >
              <option value=""></option>
              {months.map((month) => (
                <option value={month.value} key={month.value}>
                  {month.name}
                </option>
              ))}
            </select>
            {errors.month && (
              <div id="monthErr" className="text-red-500 text-sm mt-1">
                {errors.month.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <select
              id="year"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("year", {
                required: { value: true, message: "Year is required" },
              })}
            >
              <option value=""></option>
              {years.map((y) => (
                <option value={y} key={y}>
                  {y}
                </option>
              ))}
            </select>
            {errors.year && (
              <div id="yearErr" className="text-red-500 text-sm mt-1">
                {errors.year.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("amount", {
                required: { value: true, message: "Amount is required" },
                min: {
                  value: 100,
                  message: "Amount should not be less than 100",
                },
              })}
            />
            {errors.amount && (
              <div id="amountErr" className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              id="submit"
              className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
              disabled={!isValid}
            >
              Make Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
