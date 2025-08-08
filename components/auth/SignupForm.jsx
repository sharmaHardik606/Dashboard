"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  OctagonAlert,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import OtpForm from "./forgetpass/OtpForm";
import {
  setSignupEmail,
  setSignupStep,
  resetSignup,
} from "@/redux/slices/signupSlice";
import { signupUserThunk } from "@/redux/slices/authSlice";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const step = useSelector((state) => state.signup.step);
  const email = useSelector((state) => state.signup.email);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const passwordValue = password ?? "";

  const rules = {
    minLen: passwordValue.length >= 8,
    combo:
      /[a-z]/.test(passwordValue) &&
      /[A-Z]/.test(passwordValue) &&
      /\d/.test(passwordValue) &&
      /[^\w\s]/.test(passwordValue), // at least one symbol
    noEdgeSpace: passwordValue === passwordValue.trim(),
    // Can't check this client-side, so just display as info.
    notInLast12: true,
  };

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const result = await dispatch(signupUserThunk(data)).unwrap();
      console.log("✅ Signup successful", result);

      dispatch(setSignupEmail(data.email));
      dispatch(setSignupStep("otp"));
    } catch (err) {
      alert(err || "Signup failed");
    }
  };

  if (step === "otp") {
    return <OtpForm email={email} />;
  }

  return (
    <div className="min-h-screen w-full flex items-start justify-center pt-20 pb-10">
      {/* UI remains unchanged */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Already have an Account?</span>
          <a href="/login">
            <Button
              variant="hollowblue"
              className="text-blue-600 font-semibold text-sm"
            >
              LOG IN
            </Button>
          </a>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md space-y-6 p-4">
        <div className="w-full max-w-md space-y-6">
          <button
            onClick={() => router.back()}
            className="text-black inline-flex items-center"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
          </button>

          <div>
            <p className="text-blue-600 font-semibold text-sm uppercase mb-1">
              SIGN UP
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Welcome to AyuProFit
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: "Full name is required" })}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name?.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email?.message}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("contact", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                placeholder="Enter your contact number"
                className="w-full px-3 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.contact && (
                <p className="text-xs text-red-500">
                  {errors.contact?.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Must be at least 8 characters",
                    },
                    validate: {
                      notBlank: (v) =>
                        v?.trim() === v ||
                        "Don't start or end with blank space",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (v) => v === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>

            <ul className="text-xs space-y-1 pl-0">
              <li className="flex items-center gap-2">
                {rules.minLen ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : (
                  <OctagonAlert className="w-4 h-4 text-gray-700 flex-shrink-0" />
                )}
                <span
                  className={rules.minLen ? "text-green-600" : "text-gray-700"}
                >
                  Must be at least 8 characters or more.
                </span>
              </li>

              <li className="flex items-center gap-2">
                {rules.combo ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : (
                  <OctagonAlert className="w-4 h-4 text-gray-700 flex-shrink-0" />
                )}
                <span
                  className={rules.combo ? "text-green-600" : "text-gray-700"}
                >
                  Use uppercase, lowercase, numbers, and symbols.
                </span>
              </li>

              <li className="flex items-center gap-2">
                {rules.noEdgeSpace ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : (
                  <OctagonAlert className="w-4 h-4 text-gray-700 flex-shrink-0" />
                )}
                <span
                  className={
                    rules.noEdgeSpace ? "text-green-600" : "text-gray-700"
                  }
                >
                  Don't start or end your password with a blank space.
                </span>
              </li>

              <li className="flex items-center gap-2">
                {rules.notInLast12 ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : (
                  <OctagonAlert className="w-4 h-4 text-gray-700 flex-shrink-0" />
                )}
                <span
                  className={
                    rules.notInLast12 ? "text-green-600" : "text-gray-700"
                  }
                >
                  Must be different from your last 12 passwords.
                </span>
              </li>
            </ul>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
              disabled={loading || isSubmitting}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>

            <p className="text-xs text-center text-gray-500 mt-2">
              By continuing, you agree to Ayuprofit's{" "}
              <a href="#" className="underline text-blue-600">
                Terms of use
              </a>{" "}
              and confirm you have read Ayuprofit’s{" "}
              <a href="#" className="underline text-blue-600">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
