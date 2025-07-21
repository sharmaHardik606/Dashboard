"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider } from "@/context/SidebarContext";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { isLoggedIn } from "@/utils/auth";

// List of public (non-auth) routes
const PUBLIC_ROUTES = ["/login", "/signup"];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    const checkAuth = () => {
      const valid = isLoggedIn();
      setAuthenticated(valid);
      setLoading(false);

      // If not authenticated and not on public route → redirect to /login
      if (!valid && !isPublicRoute) {
        router.replace("/login");
      }
    };

    setTimeout(checkAuth, 0); // Needed for localStorage access
  }, [pathname]);

  if (loading) return null;

  // Show public layout for login/signup
  if (isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        {children}
      </div>
    );
  }

  // Don't show protected content if not authenticated
  if (!authenticated) return null;

  // Icon-only Sidebar logic
  const iconOnly = pathname === "/settings";

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1 w-full">
          <Sidebar iconOnly={iconOnly} />
          <main className="flex-1 sm:p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
