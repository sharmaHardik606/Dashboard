"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // TEMP: Mock success
    alert("Account created successfully!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen px-4 py-8 flex items-center justify-center w-full">
      <div className="absolute top-10 right-10 text-sm">
        <span className="text-gray-600">Already have an Account?{" "}</span>
        
        <a href="/login" className="text-blue-600 font-semibold text-sm">
          <Button
            variant={"hollowblue"}
            className="text-blue-600 font-semibold"
          >
            {" "}
            LOG IN
          </Button>
        </a>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={() => router.back()}
          className="text-black inline-flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
        </button>

        <div>
          <p className="text-blue-600 font-semibold text-sm uppercase mb-1">
            SIGN UP
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to AyuProFit
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your first and last name"
              className="w-full px-3 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              name="contact"
              type="tel"
              value={form.contact}
              onChange={handleChange}
              required
              placeholder="Enter your contact number"
              className="w-full px-3 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md border-gray-300 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 hover:cursor-pointer transition"
          >
            Sign up
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
  );
}
