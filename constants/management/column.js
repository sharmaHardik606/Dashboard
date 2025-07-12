export const memberColumns = [
  { key: "id", header: "Member ID" },
  { key: "name", header: "Name" },
  { key: "contact", header: "Contact" },
  { key: "plan", header: "Plan" },
  { key: "renewalDate", header: "Renewal Date" },
  {
    key: "status",
    header: "Status",
    render: (value) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
          value === "active"
            ? "bg-green-100 text-green-700"
            : value === "expired"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {value}
      </span>
    ),
  },
];

export const staffColumns = [
  { key: "id", header: "Staff ID" },
  { key: "name", header: "Name" },
  { key: "contact", header: "Contact" },
  { key: "role", header: "Role" },
  {
    key: "status",
    header: "Status",
    render: (value) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
          value === "active"
            ? "bg-green-100 text-green-700"
            : value === "expired"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {value}
      </span>
    ),
  },
];

export const attendanceColumns = [
  { key: "name", header: "Name" },
  { key: "contact", header: "Contact" },
  { key: "type", header: "User Type" },
  { key: "checkInTime", header: "Check-In Time" },
  { key: "method", header: "Method" },
];
