export default function SettingsSidebar({ active, onChange }) {
  const tabs = [
    "General Settings",
    "User & Role Management",
    "Membership Plan Settings",
    "Billing & Payment Settings",
    "Attendance System Settings",
    "Communication Settings",
  ];

  return (
    <div className=" flex flex-col space-y-2 gap-2">
      {tabs.map((label, index) => {
        const key = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-full text-left px-3 py-2  rounded-lg transition font-semibold  ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-white hover:cursor-pointer text-gray-700 shadow"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
