"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { loginUserThunk } from "@/redux/slices/authSlice";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values) => {
    const { email, password } = values;

    try {
      const resultAction = await dispatch(
        loginUserThunk({ email, password }) // send to redux thunk
      );

      if (loginUserThunk.fulfilled.match(resultAction)) {
        router.push("/dashboard");
      } else {
        const errMsg =
          resultAction.payload || // this is the actual error message
          resultAction.error?.message ||
          "Login failed";
        alert(errMsg);
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

  // for "show password" toggle
  const passwordValue = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-10 text-sm">
        <div className="flex items-center gap-2 ">
          <span className="text-gray-600">Don’t have an account?</span>
          <a href="/signup">
            <Button
              variant="hollowblue"
              className="text-blue-600 font-semibold text-sm"
            >
              SIGN UP
            </Button>
          </a>
        </div>
      </div>

      <div className="w-full max-w-md space-y-6 p-4">
        <button onClick={() => router.back()} className="text-black">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <p className="text-blue-600 font-semibold text-sm uppercase mb-1">
            Log in
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Welcome to AyuProFit
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900 block mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {showPass ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-blue-600"
                {...register("rememberMe")}
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-blue-700 font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 hover:cursor-pointer transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
