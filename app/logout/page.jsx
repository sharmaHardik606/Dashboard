"use client";

import { useEffect } from "react";
import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/login");
  }, []);

  return <p>Logging you out...</p>;
}
