"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div>
      <SignupForm />
    </div>
  );
}
