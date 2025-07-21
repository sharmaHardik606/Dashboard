"use client";

import { useRouter } from "next/navigation";
import ForgotPassword from "@/components/auth/forgetpass/ForgetPassword";

export default function ForgetPasswordPage() {
  const router = useRouter();

  return (
    <div>
      <ForgotPassword />
    </div>
  );
}
