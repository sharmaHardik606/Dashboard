"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setStep, setEmail } from "@/redux/slices/forgotPasswordSlice";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { sendForgotOtp } from "@/redux/thunks/forgotPasswordThunks";

export default function EmailForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(sendForgotOtp(data.email)).unwrap();
      dispatch(setEmail(data.email));
      dispatch(setStep("otp"));
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full min-w-[300px] sm:min-w-[480px] space-y-6 p-4">
        <button onClick={() => router.back()} className="text-black">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <p className="text-blue-600 font-semibold text-sm uppercase mb-1">
            Forgot Password
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Welcome to Ayuprofit
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  // Simple email regex pattern
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
