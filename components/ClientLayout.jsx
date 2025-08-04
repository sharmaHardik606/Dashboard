"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider } from "@/context/SidebarContext";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import CompleteProfileForm from "@/components/complete-profile/CompleteProfileForm";
import { useSelector } from "react-redux";

// List of public (non-auth) routes
const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isProfileComplete = useSelector(
    (state) => state.profile.isProfileComplete
  );

  useEffect(() => {
    if (!isPublicRoute && !isAuthenticated) {
      router.replace("/login");
    }
  }, [pathname, isAuthenticated, isPublicRoute, router]);

  // Show public layout for login/signup
  if (isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        {children}
      </div>
    );
  }

  // Wait for Redux hydration (persisted state) to confirm authentication
  if (!isAuthenticated) return null;

  const iconOnly = pathname === "/settings";
  // In ClientLayout.jsx, right before your return:
  console.log("isProfileComplete from Redux:", isProfileComplete);

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full relative">
        <div
          className={`relative flex flex-col min-h-screen w-full transition-all duration-200 
            ${
              !isProfileComplete
                ? "backdrop-blur-sm pointer-events-none select-none"
                : ""
            }`}
        >
          <Navbar />
          <div className="flex flex-1 w-full">
            <Sidebar iconOnly={iconOnly} />
            <main className="flex-1 sm:p-4 overflow-auto relative">
              {children}
            </main>
          </div>
        </div>
        {!isProfileComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* This is the SINGLE OVERLAY controlling the whole onboarding flow */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-none" />
            <div className="relative z-10">
              <CompleteProfileForm />
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}
