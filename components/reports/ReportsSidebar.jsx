'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const groupedLinks = [
  {
    section: 'Members Reports',
    links: [
      { label: 'Members List', href: '/reports/members-list' },
      { label: 'New Sign-ups', href: '/reports/new-signups' },
      { label: 'Membership Expiry', href: '/reports/membership-expiry' },
    ],
  },
  {
    section: 'Financial Reports',
    links: [
      { label: 'Payment Summary', href: '/reports/payment-summary' },
      { label: 'Revenue by Plan', href: '/reports/revenue-by-plan' },
    ],
  },
  {
    section: 'Attendance Reports',
    links: [
      { label: 'Attendance Log', href: '/reports/attendance-log' },
    ],
  },
];

export default function ReportsSidebar() {
  const pathname = usePathname();

  return (
    <div className="">
      {groupedLinks.map(group => (
        <div key={group.section}>
          <p className="text-sm font-semibold capitalize mb-2">{group.section}</p>
          <div className="space-y-1">
            {group.links.map(link => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`cursor-pointer p-4 rounded-md text-sm font-medium bg-white shadow space-y-6 ${
                    pathname === link.href
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
