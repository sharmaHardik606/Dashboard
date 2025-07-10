"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  House,
  UserRound,
  ChartColumnBig,
  NotepadText,
  MessageSquareMore,
  Settings,
  NotepadTextDashed,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PiArrowBendDownRight } from "react-icons/pi";
import { useSidebar } from "@/context/SidebarContext";

export function Sidebar() {
  const pathname = usePathname();
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <House className="h-5 w-5" strokeWidth={3} />,
    },
    {
      name: "Management",
      icon: <UserRound className="h-5 w-5" strokeWidth={3} />,
      subItems: [
        {
          name: "Members",
          href: "/management/members",
          icon: <PiArrowBendDownRight strokeWidth={3} className="h-5 w-5" />,
        },
        {
          name: "Staff",
          href: "/management/staff",
          icon: <PiArrowBendDownRight strokeWidth={3} className="h-5 w-5" />,
        },
        {
          name: "Attendance",
          href: "/management/attendance",
          icon: <PiArrowBendDownRight strokeWidth={3} className="h-5 w-5" />,
        },
      ],
    },
    {
      name: "Payment",
      href: "/payment",
      icon: <ChartColumnBig strokeWidth={3} className="h-5 w-5" />,
    },
    {
      name: "Plan Library",
      href: "/planlibrary",
      icon: <NotepadText strokeWidth={3} className="h-5 w-5" />,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: <MessageSquareMore strokeWidth={3} className="h-5 w-5" />,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: <NotepadTextDashed strokeWidth={3} className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings strokeWidth={3} className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "ml-6 mt-4 mb-4 w-70 bg-neutral-200 rounded-3xl p-6 flex flex-col justify-between",
        "transition-transform duration-300 ease-in-out z-40",
        isSidebarOpen ? "block fixed top-16 left-0 w-72" : "hidden lg:flex"
      )}
    >
      <nav className="flex flex-col space-y-1">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => setIsManagementOpen(!isManagementOpen)}
                  className={cn(
                    "flex items-center gap-2 py-3 px-2 w-full rounded-md",
                    pathname.startsWith("/management")
                  )}
                >
                  {item.icon}
                  <span className="flex-1 text-sm text-left font-semibold text-neutral-600">
                    {item.name}
                  </span>
                  {isManagementOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                <div
                  className={cn(
                    "mt-1 space-y-1 transition-all duration-200 ease-in-out overflow-hidden",
                    isManagementOpen
                      ? "opacity-100 max-h-96 translate-y-0"
                      : "opacity-0 max-h-0 -translate-y-1 pointer-events-none"
                  )}
                >
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-2 py-3 px-2 rounded-md ",
                        pathname === subItem.href && "bg-blue-600 text-white"
                      )}
                    >
                      {subItem.icon}
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          pathname === subItem.href
                            ? "text-white"
                            : "text-neutral-600"
                        )}
                      >
                        {subItem.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 py-3 px-2 rounded-md ",
                  pathname === item.href && "bg-blue-600 text-white"
                )}
              >
                {item.icon}
                <span
                  className={cn(
                    "text-sm font-semibold",
                    pathname === item.href ? "text-white" : "text-neutral-600"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <ArrowLeft
        className="self-end mt-6 cursor-pointer block lg:hidden"
        onClick={closeSidebar}
      />
    </aside>
  );
}
