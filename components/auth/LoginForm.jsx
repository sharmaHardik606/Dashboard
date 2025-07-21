"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/redux/slices/authSlice";
import Link from "next/link";
// import { loginUser } from "@/lib/api/auth"; // TODO: Uncomment this when backend is ready

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ TEMP LOGIN SIMULATION
    const dummyEmail = "admin@ayuprofit.in";
    const dummyPassword = "test123";

    if (email === dummyEmail && password === dummyPassword) {
      const fakeToken = "FAKE_TOKEN_123";
      const fakeUser = {
        name: "Admin",
        email: dummyEmail,
        role: "admin",
      };

      // Save fake token
      localStorage.setItem("token", fakeToken);

      // Dispatch fake user to redux
      dispatch(loginAction({ user: fakeUser, token: fakeToken }));

      // Navigate to dashboard
      router.push("/dashboard");
    } else {
      alert("Invalid credentials. Try:\nadmin@ayuprofit.in / test123");
    }

    // 🔒 TODO: Replace above block with real API call
    /*
    try {
      const data = await loginUser(email, password); // call real API
      localStorage.setItem("token", data.token); // store token
      dispatch(loginAction({ user: data.user, token: data.token })); // update redux
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
    */
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="absolute top-10 right-10 text-sm">
        <span className="text-gray-600">Don’t have an account? </span>
        <a href="/signup" className="text-blue-600 font-semibold text-sm">
          <Button
            variant={"hollowblue"}
            className="text-blue-600 font-semibold"
          >
            SIGN UP
          </Button>
        </a>
      </div>

      <div className="w-full max-w-md space-y-6 p-4">
        <button onClick={() => router.back()} className="text-black">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <p className="text-blue-600 font-semibold text-sm uppercase mb-1">
            Log in
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to AyuProFit
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

          <div>
            <label className="text-sm font-medium text-gray-900 block mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPass ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-blue-600"
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
