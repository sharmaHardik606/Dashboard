"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ← NEW

  useEffect(() => {
    setIsCollapsed(pathname === "/settings");
    setIsSidebarOpen(false); // ← Auto close on route change
  }, [pathname]);

  const expandSidebar = () => setIsCollapsed(false);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        expandSidebar,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar, // ← NEW
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);



