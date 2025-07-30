"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetForgotPassword } from "@/redux/thunks/forgotPasswordThunks";

export default function ResetForm() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  // Watch passwords for validation
  const password = watch("password");

  const email = useSelector((state) => state.forgotpass.email);

  const onSubmit = async (data) => {
    if (data.password !== data.confirm) return alert("Passwords do not match.");

    try {
      await dispatch(
        resetForgotPassword({ email, password: data.password })
      ).unwrap();
      router.push("/login");
    } catch (err) {
      console.error("Reset error:", err);
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-md space-y-6 p-4">
        <button onClick={() => router.back()} className="text-black">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <p className="text-blue-600 font-semibold text-sm uppercase mb-1">
            Forgot Password
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Welcome To AyuProfit
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-1">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters",
                  },
                  // You can add extra validations here if needed!
                  validate: (value) =>
                    value.trim() === value || "Don't start or end with a space",
                })}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {show ? (
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

          <div>
            <label className="text-sm font-medium text-gray-900 block mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              {...register("confirm", {
                required: "Confirmation required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirm && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirm.message}
              </p>
            )}
          </div>

          <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
            <li>Must be at least 8 characters or more.</li>
            <li>
              Use a combination of uppercase and lowercase letters, numbers, and
              symbols.
            </li>
            <li>Don't start or end your password with a blank space.</li>
            <li>Must be different from your last 12 passwords.</li>
          </ul>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
