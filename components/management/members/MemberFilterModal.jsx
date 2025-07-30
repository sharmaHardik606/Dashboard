"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

export default function MemberFiltersModal({ open, onClose }) {
  const [statuses, setStatuses] = useState({
    active: false,
    expired: false,
    frozen: false,
    nearingRenewal: true,
  });

  const [plan, setPlan] = useState("gold");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  // For quick date presets
  const setQuickDate = (type) => {
    const today = new Date();
    if (type === "today") {
      setDateRange({ from: today, to: today });
    } else if (type === "week") {
      const day = today.getDay();
      const from = new Date(today);
      from.setDate(today.getDate() - day);
      const to = new Date(from);
      to.setDate(from.getDate() + 6);
      setDateRange({ from, to });
    } else if (type === "month") {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      const to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setDateRange({ from, to });
    }
  };

  const handleStatusChange = (status) => {
    setStatuses((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const clearFilters = () => {
    setStatuses({
      active: false,
      expired: false,
      frozen: false,
      nearingRenewal: false,
    });
    setPlan("gold");
    setDateRange({ from: new Date(), to: new Date() });
  };

  const applyFilters = () => {
    // send filter data elsewhere
    onClose && onClose();
  };

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b">Filters</DialogTitle>
        </DialogHeader>

        {/* Membership Status */}
        <div className="mb-4">
          <p className="font-medium text-sm mb-2">Membership Status</p>
          <div className="flex gap-6 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={statuses.active}
                onCheckedChange={() => handleStatusChange("active")}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              Active
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={statuses.expired}
                onCheckedChange={() => handleStatusChange("expired")}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              Expired
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={statuses.frozen}
                onCheckedChange={() => handleStatusChange("frozen")}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              Frozen
            </label>
            <label className="flex items-center gap-2 cursor-pointer ">
              <Checkbox
                checked={statuses.nearingRenewal}
                onCheckedChange={() => handleStatusChange("nearingRenewal")}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              Nearing Renewal
            </label>
          </div>
        </div>

        {/* Membership Plan */}
        <div className="mb-4">
          <p className="font-medium text-sm mb-2">Membership Plan</p>
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gold">Gold Plan</SelectItem>
              <SelectItem value="silver">Silver Plan</SelectItem>
              <SelectItem value="platinum">Platinum Plan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Renewal Date Range */}
        <div>
          <p className="font-medium text-sm mb-2">Renewal Date Range</p>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {/* Start Date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-1/2 justify-start text-left"
                >
                  {format(dateRange.from, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={date => setDateRange(r => ({ ...r, from: date || r.from }))}
                />
              </PopoverContent>
            </Popover>
            {/* End Date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-1/2 justify-start text-left"
                >
                  {format(dateRange.to, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={date => setDateRange(r => ({ ...r, to: date || r.to }))}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="hollow" size="sm" onClick={() => setQuickDate("today")}>
              Today
            </Button>
            <Button variant="hollow" size="sm" onClick={() => setQuickDate("week")}>
              This Week
            </Button>
            <Button variant="hollow" size="sm" onClick={() => setQuickDate("month")}>
              This Month
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="hollow" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button variant="mainblue" onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
