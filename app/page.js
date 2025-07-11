"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardPage from "./dashboard/page";
import { isLoggedIn } from "@/utils/auth";

export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const valid = isLoggedIn();

    if (!valid) {
      router.replace("/login"); // Redirect if not logged in
    } else {
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  if (loading || !authenticated) return null;

  return <DashboardPage />;
}
