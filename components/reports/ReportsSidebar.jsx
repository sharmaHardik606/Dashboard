"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const groupedLinks = [
  {
    section: "Members Reports",
    links: [
      {
        label: "Members List",
        tagline: "Complete list of all registerd members",
        href: "/reports/members-list",
      },
      {
        label: "New Sign-ups",
        tagline: "Complete list of all registerd members",
        href: "/reports/new-signups",
      },
      {
        label: "Membership Expiry",
        tagline: "Complete list of all registerd members",
        href: "/reports/membership-expiry",
      },
    ],
  },
  {
    section: "Financial Reports",
    links: [
      {
        label: "Payment Summary",
        tagline: "Complete list of all registerd members",
        href: "/reports/payment-summary",
      },
      {
        label: "Revenue by Plan",
        tagline: "Complete list of all registerd members",
        href: "/reports/revenue-by-plan",
      },
    ],
  },
  {
    section: "Attendance Reports",
    links: [
      {
        label: "Attendance Log",
        tagline: "Complete list of all registerd members",
        href: "/reports/attendance-log",
      },
    ],
  },
];

export default function ReportsSidebar() {
  const pathname = usePathname();

  return (
    <div className="">
      {groupedLinks.map((group) => (
        <div key={group.section}>
          <p className="text-md font-semibold capitalize mb-3 mt-2">
            {group.section}
          </p>
          <div className="space-y-1 flex flex-col gap-2">
            {group.links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`cursor-pointer flex flex-col gap-2 px-3 py-4 rounded-md text-sm font-semibold bg-white shadow space-y-6 ${
                    pathname === link.href
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {link.label}
                  <div className="text-xs font-semibold ">{link.tagline}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
