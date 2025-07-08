"use client";

import Link from "next/link";
import { Bell,Slack } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  return (
    <header className=" sticky top-0 z-50 h-auto bg-gray-50 dark:bg-black py-1.5">
      <div className="flex h-16 items-center px-6 justify-between">
        {/* Logo on left */}
        <Link href="/" className="flex items-center gap-2">
        <Slack className="text-3xl"/>
          <span className="text-3xl font-bold uppercase">Logo</span>
        </Link>

        {/* Icons on right */}
        <div className="flex items-center gap-4">
            <Bell className="h-8 w-8"/>
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <Image
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?_gl=1*14m8y34*_ga*MTIyMjI4MjgzMC4xNzI4ODQyNTM4*_ga_8JE65Q40S6*czE3NTE4ODY5MzYkbzE5JGcxJHQxNzUxODg2OTUyJGo0NCRsMCRoMA.."
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