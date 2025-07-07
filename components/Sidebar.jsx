"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, House, UserRound, ChartColumnStacked, NotepadText, MessageSquareMore, Settings, NotepadTextDashed } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const [isManagementOpen, setIsManagementOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <House className="h-5 w-5" /> },
    {
      name: "Management", 
      icon: <UserRound className="h-5 w-5" />,
      subItems: [
        { name: "Members", href: "/management/members" },
        { name: "Staff", href: "/management/staff" },
        { name: "Attendance", href: "/management/attendance" },
      ],
    },
    { name: "Payment", href: "/payment", icon: <ChartColumnStacked className="h-5 w-5" /> },
    { name: "Plan Library", href: "/planlibrary", icon: <NotepadText className="h-5 w-5" /> },
    { name: "Messages", href: "/messages", icon: <MessageSquareMore className="h-5 w-5" /> },
    { name: "Reports", href: "/reports", icon: <NotepadTextDashed className="h-5 w-5" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside className="ml-6 h-[calc(100vh-2rem)] mt-4 mb-4 w-64 border-r bg-gray-100 rounded-2xl">
      <nav className="flex flex-col p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => setIsManagementOpen(!isManagementOpen)}
                  className={cn(
                    "flex items-center gap-2 w-full p-2 rounded-xl hover:bg-blue-100 transition-colors",
                    (pathname.startsWith("/management") && item.name === "Management") 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-blue-100"
                  )}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.name}</span>
                  {isManagementOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {isManagementOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-xl hover:bg-blue-100 transition-colors",
                          pathname === subItem.href && "bg-blue-600 text-white"
                        )}
                      >
                        <span className="w-5"></span> {/* Spacer to align with parent */}
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-xl hover:bg-blue-100 transition-colors",
                  pathname === item.href && "bg-blue-600 text-white"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}