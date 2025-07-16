"use client";

import { ContainerCard } from "../sharedcomponents/ContainerCard";

export default function ExportSection({
  title,
  defaultStartDate,
  defaultEndDate,
  filters = [],
  showDateRange = true,
  showFilters = true,
  showFormat = true,
  onExport,
}) {
  return (
    <div className="space-y-6">
      <ContainerCard className="space-y-6">
        {/* Title */}
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* Date Range */}
        {showDateRange && (
          <div className="border rounded-xl p-4 space-y-4">
            <h3 className="font-semibold">Date Range</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Start Date</label>
                <input
                  type="date"
                  defaultValue={defaultStartDate}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">End Date</label>
                <input
                  type="date"
                  defaultValue={defaultEndDate}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {["Today", "This Week", "This Month"].map((label) => (
                <button
                  key={label}
                  className="border px-3 py-1.5 rounded-md text-sm hover:bg-gray-100"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        {showFilters && filters.length > 0 && (
          <div className="border rounded-xl p-4 space-y-4">
            <h3 className="font-semibold">Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filters.map((filterLabel, index) => (
                <div key={index}>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {filterLabel}
                  </label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md">
                    <option>All</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Output Format */}
        {showFormat && (
          <div className="border rounded-xl p-4 space-y-4">
            <h3 className="font-semibold">Output Format</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="format" />
                Excel (CSV)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="format" defaultChecked />
                PDF
              </label>
            </div>
          </div>
        )}

        {/* Export Button */}
        <div>
          <button
            onClick={onExport}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Generate & Export
          </button>
        </div>
      </ContainerCard>
    </div>
  );
}
