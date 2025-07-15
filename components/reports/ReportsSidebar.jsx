'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Members List', href: '/reports/members-list' },
  { label: 'New Sign-ups', href: '/reports/new-signups' },
  { label: 'Membership Expiry', href: '/reports/membership-expiry' },
  { label: 'Payment Summary', href: '/reports/payment-summary' },
  { label: 'Revenue by Plan', href: '/reports/revenue-by-plan' },
  { label: 'Attendance Log', href: '/reports/attendance-log' },
];

export default function ReportsSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-xl p-4 shadow space-y-2">
      {links.map(link => (
        <Link key={link.href} href={link.href}>
          <div className={`cursor-pointer px-4 py-2 rounded-md ${pathname === link.href ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            {link.label}
          </div>
        </Link>
      ))}
    </div>
  );
}
