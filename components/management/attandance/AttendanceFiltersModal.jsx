"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

export default function AttendanceFiltersModal({ open, onClose }) {
  const [userType, setUserType] = useState("all");
  const [method, setMethod] = useState("all");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const applyFilters = () => {
    console.log("Applied Filters:", { userType, method, startDate, endDate });
    onClose(); // use prop instead of setOpen(false)
  };

  const clearFilters = () => {
    setUserType("all");
    setMethod("all");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const setQuickDate = (range) => {
    const today = new Date();
    if (range === "today") {
      setStartDate(today);
      setEndDate(today);
    } else if (range === "week") {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      setStartDate(weekStart);
      setEndDate(weekEnd);
    } else if (range === "month") {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setStartDate(monthStart);
      setEndDate(monthEnd);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className={"pb-4 border-b"}>Filters</DialogTitle>
        </DialogHeader>

        {/* User Type */}
        <div className="space-y-1">
          <label className="text-sm font-medium">User Type</label>
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Method */}
        <div className="space-y-1 mt-4">
          <label className="text-sm font-medium">Method</label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="biomatric">Biomatric</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="qrscan">QR Scan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="mt-4 ">
          <label className="text-sm font-medium mb-2 block">Renewal Date Range</label>
          <div className="flex items-center flex-col sm:flex-row gap-2 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-1/2 justify-start text-left">
                  {format(startDate, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-1/2 justify-start text-left">
                  {format(endDate, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2 mt-3">
            <Button variant="hollow" size="sm" onClick={() => setQuickDate("today")}>Today</Button>
            <Button variant="hollow" size="sm" onClick={() => setQuickDate("week")}>This Week</Button>
            <Button variant="hollow" size="sm" onClick={() => setQuickDate("month")}>This Month</Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="hollow" onClick={clearFilters}>Clear Filters</Button>
          <Button variant="mainblue" onClick={applyFilters}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
