"use client";

const groupedLinks = [
  {
    section: "Members Reports",
    links: [
      {
        label: "Members List",
        tagline: "Complete list of all registered members.",
        key: "members-list",
      },
      {
        label: "New Sign-ups",
        tagline: "Members who joined in a specific period.",
        key: "new-signups",
      },
      {
        label: "Membership Expiry",
        tagline: "Memberships expiring soon or recently expired.",
        key: "membership-expiry",
      },
    ],
  },
  {
    section: "Financial Reports",
    links: [
      {
        label: "Payment Summary",
        tagline: "Overview of payment received and pending.",
        key: "payment-summary",
      },
      {
        label: "Revenue by Plan",
        tagline: "Breakdown of revenue per membership plan.",
        key: "revenue-by-plan",
      },
    ],
  },
  {
    section: "Attendance Reports",
    links: [
      {
        label: "Attendance Log",
        tagline: "Detailed log of members and staff check-ins.",
        key: "attendance-log",
      },
    ],
  },
];

export default function ReportsSidebar({ active, onSelect }) {
  return (
    <div>
      {groupedLinks.map((group) => (
        <div key={group.section}>
          <p className="text-md font-semibold capitalize mb-3 mt-2">
            {group.section}
          </p>
          <div className="space-y-1 flex flex-col gap-2">
            {group.links.map((link) => {
              const isActive = active === link.key;

              return (
                <div
                  key={link.key}
                  onClick={() => onSelect(link.key)}
                  className={`cursor-pointer px-4 py-4 rounded-md shadow transition-colors duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="text-md font-semibold mb-2">{link.label}</div>
                  <div
                    className={`text-xs font-medium ${
                      isActive ? "text-white/80" : "text-neutral-500"
                    }`}
                  >
                    {link.tagline}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
