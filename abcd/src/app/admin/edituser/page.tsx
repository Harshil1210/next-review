"use client";
import { useAppSelector } from "@/Redux/hooks";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Inputs } from "../createuser/page";
import { updateUser } from "@/Actions/adminAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page() {
  const { edituser } = useAppSelector((state) => state.user);
  const {
    register,
    formState: { errors,isValid },
  } = useForm<Inputs>({ mode: "all" });

  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(updateUser, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.message !== "") {
      if (state && state.message === "success") {
        toast.success("user updated successfully");
        router.push("/admin/userlist");
      } else {
        toast.error(state?.message!);
      }
    }
  }, [state]);

  return (
    <div className="w-full min-h-screen p-4 lg:p-15 md:p-10 sm:p-5">
      <form
        action={formAction}
        className="p-3 lg:p-10 md:p-6 xl:p-10 sm:p-4 h-auto w-full lg:grid-cols-3 grid-cols-1 md:grid-cols-2 sm:grid-cols-2 grid gap-4 border border-zinc-1000"
      >
        <input value={edituser?._id} hidden name="user_id" readOnly />
        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: { value: true, message: "First Name is required" },
              maxLength: {
                value: 15,
                message: "For First Name maximum 15 char allowed",
              },
              minLength: {
                value: 3,
                message: "For First Name minimum 3 char required",
              },
            })}
            defaultValue={edituser?.firstName}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic" id="firstNameErr">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: { value: true, message: "Last Name is required" },
              maxLength: {
                value: 15,
                message: "For Last Name maximum 15 char allowed",
              },
              minLength: {
                value: 3,
                message: "For Last Name minimum 3 char required",
              },
            })}
            defaultValue={edituser?.lastName}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic" id="lastNameErr">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="middleName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Middle Name
          </label>
          <input
            type="text"
            id="middleName"
            {...register("middleName", {
              required: { value: true, message: "Middle Name is required" },
              maxLength: {
                value: 15,
                message: "For Middle Name maximum 15 char allowed",
              },
              minLength: {
                value: 3,
                message: "For Middle Name minimum 3 char required",
              },
            })}
            defaultValue={edituser?.middleName}
            className=" border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
          />
          {errors.middleName && (
            <p className="text-red-500 text-xs italic" id="middleNameErr">
              {errors.middleName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="emailId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="emailId"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Pleae enter valid email",
              },
            })}
            defaultValue={edituser?.email}
            className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic" id="emailIdErr">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="flatNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Flat Number
          </label>
          <input
            type="number"
            id="flatNumber"
            {...register("flatnumber", {
              required: { value: true, message: "Flat Number is required" },
            })}
            defaultValue={edituser?.flatnumber}
            className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
          />
          {errors.flatnumber && (
            <p className="text-red-500 text-xs italic" id="flatNumberErr">
              {errors.flatnumber.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="area"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Area
          </label>
          <input
            type="text"
            id="area"
            {...register("Area", {
              required: { value: true, message: "Area is required" },
            })}
            defaultValue={edituser?.area}
            className=" border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
          />
          {errors.Area && (
            <p className="text-red-500 text-xs italic" id="areaErr">
              {errors.Area.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            {...register("City", {
              required: { value: true, message: "City is required" },
            })}
            defaultValue={edituser?.city}
            className="border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
          />
          {errors.City && (
            <p className="text-red-500 text-xs italic" id="cityErr">
              {errors.City.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            {...register("State", {
              required: { value: true, message: "State is required" },
            })}
            defaultValue={edituser?.state}
            className=" border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
          />
          {errors.State && (
            <p className="text-red-500 text-xs italic" id="stateErr">
              {errors.State.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="pinCode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pinCode"
            {...register("PinCode", {
              required: { value: true, message: "Pincode is required" },
              maxLength: {
                value: 6,
                message: "For Pincode maximum 6 digit allowed",
              },
              pattern: {
                value: /^\d+$/,
                message: "Pincode should not contain non digit characters",
              },
            })}
            defaultValue={edituser?.pinCode}
            className=" border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
          {errors.PinCode && (
            <p className="text-red-500 text-xs italic" id="pinCodeErr">
              {errors.PinCode.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Photo
          </label>
          <input
            type="file"
            id="imageUrl"
            accept="image/*"
            {...register("photo")}
            className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div></div>
        <div></div>
        <div className="items-center flex justify-center mt-3">
          <button
          disabled={!isValid}
            type="submit"
            id="submit"
            className="disabled:bg-blue-100 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
