"use client";
import { login as loginAction } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  moveToResetStep,
  setStep,
  resendOtp as resendForgotOtp,
  verifyOtpCode as verifyForgotOtp,
} from "@/redux/slices/forgotPasswordSlice";
import {
  resendSignupOtp,
  verifySignupOtp,
  setSignupStep, // <-- ADD THIS for advancing signup step in mock!
} from "@/redux/slices/signupSlice";

import { useForm } from "react-hook-form";

export default function OtpForm({ type = "signup", email }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [timer, setTimer] = useState(90);
  const inputRefs = useRef([]);

  // ---- react-hook-form setup for 6 OTP digits
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
    },
  });

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  // auto-focus/jump and value set for each digit (preserving your logic)
  const handleChange = (idx, value) => {
    if (!/^\d?$/.test(value)) return;
    setValue(`otp${idx}`, value, { shouldValidate: true });
    if (value && idx < 5) inputRefs.current[idx + 1]?.focus();
    trigger(); // validate as user moves through fields
  };

  const handleBackspace = (idx, e) => {
    if (e.key === "Backspace" && !getValues(`otp${idx}`) && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const onSubmit = (data) => {
    // Gather OTP digits
    const otpCode = [0, 1, 2, 3, 4, 5].map((i) => data[`otp${i}`] || "").join("");
    if (otpCode.length === 6) {
      if (type === "forgot") {
        dispatch(setStep("reset"));
      } else {
        // 👇 MOCK LOGIN ON SIGNUP OTP SUCCESS!
        const mockUser = {
          name: "New User",
          email, // you have this in OtpForm props
          // add any other user info as needed
        };
        const mockToken = "mocked-signup-token-123";
        dispatch(loginAction({ user: mockUser, token: mockToken }));
        localStorage.setItem("token", mockToken); // if your app checks localStorage on reload
        router.push("/dashboard");
      }
    }
  };

  // When backend is ready, replace above with your dispatches/side-effects:
  /*
  if (type === "forgot") {
    dispatch(verifyForgotOtp(otpCode));
  } else {
    dispatch(verifySignupOtp(otpCode));
  }
  */

  const handleResend = () => {
    if (type === "forgot") {
      dispatch(resendForgotOtp());
    } else {
      dispatch(resendSignupOtp());
    }
    setTimer(90);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 flex flex-col gap-6"
    >
      {type === "forgot" && (
        <button
          type="button"
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
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            ref={(el) => (inputRefs.current[idx] = el)}
            {...register(`otp${idx}`, { required: "All fields required" })}
            value={getValues(`otp${idx}`)}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleBackspace(idx, e)}
            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      {
        // Error if any field missing
        (errors.otp0 || errors.otp1 || errors.otp2 || errors.otp3 || errors.otp4 || errors.otp5) && (
          <p className="text-xs text-red-500">Please enter all 6 digits</p>
        )
      }
      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
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

      <Button
        type="submit"
        className="w-full mt-2"
        variant={"mainblue"}
      >
        Verify OTP
      </Button>
    </form>
  );
}
