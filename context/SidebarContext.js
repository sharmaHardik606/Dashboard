"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsCollapsed(pathname === "/settings");
  }, [pathname]);

  const expandSidebar = () => setIsCollapsed(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, expandSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);


