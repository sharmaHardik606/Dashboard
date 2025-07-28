"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ContainerCard } from "../sharedcomponents/ContainerCard";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"; 

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
  const [startDate, setStartDate] = useState(
    defaultStartDate ? new Date(defaultStartDate) : null
  );
  const [endDate, setEndDate] = useState(
    defaultEndDate ? new Date(defaultEndDate) : null
  );

  const formatDate = (date) => date.toISOString().split("T")[0];

  const setQuickDate = (range) => {
    const today = new Date();
    if (range === "Today") {
      setStartDate(today);
      setEndDate(today);
    } else if (range === "This Week") {
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      setStartDate(start);
      setEndDate(end);
    } else if (range === "This Month") {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <div className="space-y-6 h-full">
      <ContainerCard className="space-y-6">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Date Range */}
        {/* Date Range */}
        {showDateRange && (
          <div>
            <h3 className="font-semibold text-sm">Date Range</h3>
            <div className="flex flex-col sm:flex-row gap-4 border rounded-xl py-4 px-2 mt-2">
              <div className="w-full">
                <label className="text-xs font-medium mb-1 block">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      {startDate ? (
                        format(startDate, "dd/MM/yyyy")
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-full">
                <label className="text-xs font-medium mb-1 block">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      {endDate ? (
                        format(endDate, "dd/MM/yyyy")
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* Rest unchanged */}
            <div className="px-2 mt-2">
              <div className="w-full flex flex-wrap gap-2">
                {["Today", "This Week", "This Month"].map((label) => (
                  <Button
                    key={label}
                    variant="hollow"
                    onClick={() => setQuickDate(label)}
                    className="text-sm"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        {showFilters && filters.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm">Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-xl py-4 px-2 mt-2">
              {filters.map((filterLabel, index) => (
                <div key={index}>
                  <label className="font-medium text-gray-700 mb-2 block text-xs">
                    {filterLabel}
                  </label>
                  <Select>
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {/* Add more <SelectItem>s as needed */}
                    </SelectContent>
                  </Select>
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
        <div className="flex flex-wrap gap-2 items-center justify-end border-t pt-4">
          <Button onClick={onExport} variant="hollow">
            Reset Parameters
          </Button>
          <Button onClick={onExport} variant="mainblue">
            Generate & Export
          </Button>
        </div>
      </ContainerCard>
    </div>
  );
}
