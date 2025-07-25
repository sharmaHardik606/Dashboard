"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider } from "@/context/SidebarContext";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { isLoggedIn } from "@/utils/auth";
import CompleteProfileForm from "@/components/complete-profile/CompleteProfileForm";
import { useDispatch, useSelector } from "react-redux";

// List of public (non-auth) routes
const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const isProfileComplete = useSelector(
    (state) => state.profile.isProfileComplete
  );

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
      <div className="flex flex-col min-h-screen w-full relative">
        {/* ONE wrapper to apply blur and disable interaction */}
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
        {/* Overlay the modal above all layout */}
        {!isProfileComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
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
