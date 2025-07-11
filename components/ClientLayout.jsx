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
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const [authenticated, setAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = () => {
      const valid = isLoggedIn();
      setAuthenticated(valid);

      if (!valid && !isAuthPage) {
        router.replace("/login");
      }
    };

    // Delay by a tick to allow hydration
    setTimeout(checkAuth, 0);
  }, [pathname]);

  if (authenticated === null) return null; // still loading

  if (!authenticated && !isAuthPage) return null;

  if (isAuthPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {children}
      </div>
    );
  }

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
