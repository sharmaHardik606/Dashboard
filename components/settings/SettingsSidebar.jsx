export default function SettingsSidebar({ active, onChange }) {
  const tabs = [
    'General Settings',
    'User & Role Management',
    'Membership Plan Settings',
    'Billing & Payment Settings',
    'Attendance System Settings',
    'Communication Settings',
  ];

  return (
    <div className="w-64 bg-white border-r p-4 space-y-2">
      {tabs.map((label, index) => {
        const key = label.toLowerCase().replace(/ /g, '-');
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
              isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
