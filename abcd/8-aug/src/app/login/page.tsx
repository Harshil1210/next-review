"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/Actions/adminAction";
import { useAppDispatch } from "@/Redux/hooks";
import { useRouter } from "next/navigation";
import { addLoggedInuser } from "@/Redux/features/userSlice";

type Inputs = {
  username: string;
  password: string;
  role: string;
  otp: number;
  Id: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const dispatch = useAppDispatch();
  const [showOTP, setShowOTP] = useState(false);
  const [message, setMessage] = useState<any>();
  const router = useRouter()
  
  const roleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "devotee") {
      setShowOTP(true);
    } else {
      setShowOTP(false);
    }
  };

  const onSubmit = async (data: Inputs) => {
    try {
     const result = await login(data);
     if (result.message === "Invalid user/password/role") {
       setMessage(result.message);
       return;
     }
     localStorage.setItem("user", JSON.stringify(result.message));
     dispatch(addLoggedInuser(result.message));
     if (result.message.role === "admin") {
       router.push("/admin/userlist");
     } else if (result.message.role === "devotee") {
       router.push("/devotee/mypayments");
     } 
    } catch (error : any) {
      console.log(error.message)
    }   
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-purple-500"
              {...register("Id", {
                required: { value: true, message: "Username is required" },
              })}
            />
            {errors.Id && (
              <p className="text-red-500 text-xs mt-1" id="usernameErr">
                {errors.Id.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1" id="passwordErr">
                {errors.password.message}
              </p>
            )}
          </div>
          <p className="text-red-500 text-xs mt-1" id="roleErr"></p>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              className="form-select mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-purple-500"
              {...register("role", {
                required: { value: true, message: "Role is required" },
              })}
              onChange={(e) => roleChange(e)}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="devotee">Devotee</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1" id="roleErr">
                {errors.role.message}
              </p>
            )}
          </div>
          {showOTP && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter OTP"
                {...register("otp", {
                  required: { value: true, message: "OTP is required" },
                })}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1" id="otpErr">
                  {errors.otp.message}
                </p>
              )}
            </div>
          )}
          <button
            type="submit"
            id="submit"
            className="w-full disabled:bg-purple-300 disabled:cursor-not-allowed bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Credential
          </button>
          {/* {state?.message === "Invalid user/password/role" && (
              <div
                className="text-red-500 text-xs mt-2 text-center"
                id="authInfo"
              >
                {state.message}
              </div>
            )} */}
          {message && (
            <div
              className="text-red-500 text-xs mt-2 text-center"
              id="authInfo"
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
