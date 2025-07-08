"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, House, UserRound, ChartColumnStacked, NotepadText, MessageSquareMore, Settings, NotepadTextDashed } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PiArrowBendDownRight } from "react-icons/pi";

export function Sidebar() {
  const pathname = usePathname();
  const [isManagementOpen, setIsManagementOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/", icon: <House className="h-5 w-5" /> },
    {
      name: "Management", 
      icon: <UserRound className="h-5 w-5" />,
      subItems: [
        { name: "Members", href: "/management/members",icon:<PiArrowBendDownRight className="h-5 w-5" /> },
        { name: "Staff", href: "/management/staff", icon:<PiArrowBendDownRight className="h-5 w-5" />},
        { name: "Attendance", href: "/management/attendance", icon:<PiArrowBendDownRight className="h-5 w-5" />},
      ],
    },
    { name: "Payment", href: "/payment", icon: <ChartColumnStacked className="h-5 w-5" /> },
    { name: "Plan Library", href: "/planlibrary", icon: <NotepadText className="h-5 w-5" /> },
    { name: "Messages", href: "/messages", icon: <MessageSquareMore className="h-5 w-5" /> },
    { name: "Reports", href: "/reports", icon: <NotepadTextDashed className="h-5 w-5" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside className="ml-6 h-[calc(100vh-2rem)] mt-4 mb-4 w-70 bg-neutral-200 rounded-3xl p-1">
      <nav className="flex flex-col p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => setIsManagementOpen(!isManagementOpen)}
                  className={cn(
                    "flex items-center gap-2 w-full p-3 rounded-xl hover:bg-blue-100 transition-colors",
                    (pathname.startsWith("/management") && item.name === "Management") 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-blue-100"
                  )}
                >
                  {item.icon}
                  <span className="flex-1 text-sm text-left">{item.name}</span>
                  {isManagementOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {isManagementOpen && (
                  <div className="mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center  gap-2 p-2 rounded-xl hover:bg-blue-100 transition-colors",
                          pathname === subItem.href && "bg-blue-600 text-white"
                        )}
                      >
                        
                        {subItem.icon}
                       <span className="text-sm">{subItem.name}</span>
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
                <span className="text-sm">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}