'use client';

import MembersListFilter from '@/components/reports/MembersListFilter';

export default function MembersListPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar Section */}
        <div className="col-span-1">
          {/* Sidebar Placeholder (or you can extract this to a component) */}
          <div className="bg-white rounded-xl p-4 shadow space-y-2">
            <div className="bg-primary text-white px-4 py-2 rounded-md">Members List</div>
            <div className="hover:bg-gray-100 cursor-pointer px-4 py-2 rounded-md">New Sign up’s</div>
            <div className="hover:bg-gray-100 cursor-pointer px-4 py-2 rounded-md">Membership Expiry</div>

            <h2 className="text-sm font-semibold mt-4">Financial Reports</h2>
            <div className="hover:bg-gray-100 cursor-pointer px-4 py-2 rounded-md">Payment Summary</div>
            <div className="hover:bg-gray-100 cursor-pointer px-4 py-2 rounded-md">Revenue by Plan</div>

            <h2 className="text-sm font-semibold mt-4">Activity Reports</h2>
            <div className="hover:bg-gray-100 cursor-pointer px-4 py-2 rounded-md">Attendance Log</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="col-span-3">
          <MembersListFilter />
        </div>
      </div>
    </div>
  );
}
