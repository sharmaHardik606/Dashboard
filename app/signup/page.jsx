"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex w-full items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <SignupForm />
      </div>
    </div>
  );
}
