"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider } from "@/context/SidebarContext";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { isLoggedIn } from "@/utils/auth";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const valid = isLoggedIn();
      setAuthenticated(valid);
      setLoading(false);

      if (!valid && !isAuthPage) {
        router.replace("/login");
      }
    };

    // Wait a tick to ensure localStorage is ready
    setTimeout(checkAuth, 0);
  }, [pathname]);

  if (loading) return null;

  // Not logged in & not on login page → block render
  if (!authenticated && !isAuthPage) return null;

  // Login/Register Page: no layout
  if (isAuthPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {children}
      </div>
    );
  }

  // All other routes: show full layout
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1 w-full relative">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
