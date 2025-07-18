"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faSquarePollVertical,
  faBook,
  faMessage,
  faFileLines,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
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
      href: "/dashboard",
      icon: <FontAwesomeIcon icon={faHouse} className="h-5 w-5" />,
    },
    {
      name: "Management",
      icon: <FontAwesomeIcon icon={faUser} className="h-5 w-5" />,
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
      icon: <FontAwesomeIcon icon={faSquarePollVertical} className="h-5 w-5" />,
    },
    {
      name: "Plan Library",
      href: "/planlibrary",
      icon: <FontAwesomeIcon icon={faBook} className="h-5 w-5" />,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: <FontAwesomeIcon icon={faMessage} className="h-5 w-5" />,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: <FontAwesomeIcon icon={faFileLines} className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <FontAwesomeIcon icon={faGear} className="h-5 w-5" />,
    },
  ];

  const isSettingsPage = pathname === "/settings";
  const isIconOnlyMode = isSettingsPage && !isSidebarOpen;

  return (
    <aside
      className={cn(
  "bg-[#eeeeee] rounded-4xl transition-all duration-300 ease-in-out z-40 flex flex-col justify-between",
  iconOnly ? "w-20 p-4 fixed top-16 left-0 h-[calc(100vh-4rem)]" : "",
  isSidebarOpen ? "block fixed top-16 left-0 w-72 h-[calc(100vh-4rem)]" : "hidden lg:flex w-72 p-6",
)}

    >
      <nav className="flex flex-col space-y-1">
        {menuItems.map((item) => {
          const isManagement = item.name === "Management";

          if (isIconOnlyMode) {
            return (
              <div key={item.name}>
                {isManagement ? (
                  <button
                    onClick={() => {
                      window.location.href = "/management/members";
                    }}
                    className="flex items-center justify-center w-full py-3 px-2 rounded-md cursor-pointer"
                  >
                    {item.icon}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center w-full py-3 px-2 rounded-md cursor-pointer",
                      pathname === item.href && "bg-blue-600 text-white"
                    )}
                  >
                    {item.icon}
                  </Link>
                )}
              </div>
            );
          }

          return (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => setIsManagementOpen(!isManagementOpen)}
                    className={cn(
                      "flex items-center gap-2 py-3 px-2 w-full rounded-md cursor-pointer",
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
                          "flex items-center gap-2 py-3 px-2 rounded-lg cursor-pointer transition-colors duration-600 ease-in-out",
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
                    "flex items-center gap-2 py-3 px-2 rounded-lg cursor-pointer transition-colors duration-600 ease-in-out",
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
          );
        })}
      </nav>

      {!isIconOnlyMode && (
        <ArrowLeft
          className="self-end mt-6 cursor-pointer block lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </aside>
  );
}
