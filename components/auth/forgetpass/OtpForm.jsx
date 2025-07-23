"use client";

import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  moveToResetStep,
  resendOtp as resendForgotOtp,
  verifyOtpCode as verifyForgotOtp,
} from "@/redux/slices/forgotPasswordSlice";
import {
  resendSignupOtp,
  verifySignupOtp,
} from "@/redux/slices/signupSlice"; // 🆕 import

export default function OtpForm({ type = "signup" }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(90);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      if (type === "forgot") {
        dispatch(verifyForgotOtp(otpCode));
      } else {
        dispatch(verifySignupOtp(otpCode)); // ✅ uses correct logic
      }
    }
  };

  const handleResend = () => {
    if (type === "forgot") {
      dispatch(resendForgotOtp());
    } else {
      dispatch(resendSignupOtp());
    }
    setTimer(90);
  };

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col gap-6">
      {type === "forgot" && (
        <button
          onClick={() => dispatch(moveToResetStep("email"))}
          className="text-gray-600 w-fit"
        >
          <ArrowLeft />
        </button>
      )}

      <div className="space-y-1">
        <p className="text-sm font-semibold text-blue-600">ONE TIME PASSWORD</p>
        <h2 className="text-xl sm:text-2xl font-bold">
          Welcome to <span className="text-[#14183E]">AyuProFit</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          We've sent a One-Time Password (OTP) to your registered Email Address.
        </p>
      </div>

      <div className="flex justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleBackspace(index, e)}
            maxLength={1}
            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <button
          className="text-blue-600 hover:underline"
          disabled={timer > 0}
          onClick={handleResend}
        >
          Resend code?
        </button>
        <span className="text-gray-500">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </span>
      </div>

      <Button className="w-full mt-2" onClick={handleVerify} variant={"mainblue"}>
        Verify OTP
      </Button>
    </div>
  );
}
