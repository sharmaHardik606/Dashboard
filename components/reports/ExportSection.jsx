"use client";

import { ContainerCard } from "../sharedcomponents/ContainerCard";
import { Button } from "../ui/button";

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
    <div className="space-y-6 h-full ">
      <ContainerCard className="space-y-6">
        {/* Title */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Date Range */}
        {showDateRange && (
          <div className="">
            <h3 className="font-semibold text-sm ">Date Range</h3>

            <div className="flex flex-col sm:flex-row  gap-4 border rounded-xl py-4 px-2 mt-2">
              <div className="w-full">
                <label className="text-xs font-medium mb-1 block">
                  Start Date
                </label>
                <input
                  type="date"
                  defaultValue={defaultStartDate}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="text-xs font-medium mb-1 block">
                  End Date
                </label>
                <input
                  type="date"
                  defaultValue={defaultEndDate}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
            </div>

            <div className="px-2 mt-2">
              <div className="w-full flex gap-2">
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
          </div>
        )}

        {/* Filters */}
        {showFilters && filters.length > 0 && (
          <div className="">
            <h3 className="font-semibold text-sm ">Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-xl py-4 px-2 mt-2">
              {filters.map((filterLabel, index) => (
                <div key={index}>
                  <label className="font-medium text-gray-700 mb-2 block text-xs">
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
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Output Format</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="format" className="accent-blue-600" />
                Excel (CSV)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="format"
                  className="accent-blue-600"
                  defaultChecked
                />
                PDF
              </label>
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="flex gap-2 items-center justify-end border-t pt-4">
          <Button onClick={onExport} variant={"hollow"}>
            Reset Parameters
          </Button>
          <Button onClick={onExport} variant={"mainblue"}>
            Generate & Export
          </Button>
        </div>
      </ContainerCard>
    </div>
  );
}
