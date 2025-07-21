"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStep } from "@/redux/slices/forgotPasswordSlice";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You’ll integrate backend later
    dispatch(setStep("otp"));
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
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to Ayuprofit
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
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
