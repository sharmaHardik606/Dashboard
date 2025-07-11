"use client";

import Link from "next/link";
import { Bell, Slack, Menu } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";

export function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="w-full sticky top-0 z-50 bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-2xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 ">
            <span className="lg:text-3xl text-2xl font-bold uppercase">Logo</span>
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Bell className="h-6 w-6" />
          <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            <Image
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
              alt="User avatar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
