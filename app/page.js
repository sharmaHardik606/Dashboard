"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // fake auth check 
    const isLoggedIn = false; // replace with real check
    router.push(isLoggedIn ? "/dashboard" : "/login");
  }, [router]);

  return null;
}

