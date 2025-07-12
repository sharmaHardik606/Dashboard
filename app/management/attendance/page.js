"use client";

import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import Table from "@/components/management/Table";
import { Data } from "@/constants/management/data";
import { attendanceColumns } from "@/constants/management/columns";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/sharedcomponents/FilterBar";

export default function AttendancePage() {
  const filteredData = Data.filter((item) => item.checkInTime && item.method);
  const [searchQuery, setSearchQuery] = useState("");

  // Format today's date
  const [today, setToday] = useState("");

  useEffect(() => {
    const getFormattedDateTime = () => {
      const now = new Date();

      const date = now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      let time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      time = time.toUpperCase();

      return `${date} - ${time}`;
    };

    setToday(getFormattedDateTime());
  }, []);

  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Mark Attendance</h1>
        <div className="flex items-center text-sm font-semibold capitalize">
          {today}
        </div>
      </div>

      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        primaryButton={{
          label: "Filters",
          onClick: () => console.log("Filters clicked"),
        }}
        secondaryButton={{
          label: "Scan QR",
          onClick: () => console.log("Import clicked"),
        }}
        label="Search Members/Staff or Scan ID/QR"
      />

      <ContainerCard>
        <Table data={filteredData} columns={attendanceColumns} getActions={(item) => [
            { label: "View/Edit", onClick: () => handleView(item.id) },
            {
              label: "Assign Workout",
              onClick: () => handleWorkout(item.id),
            },
            {
              label: "Assign Diet",
              onClick: () => console.log("Assign Diet", item.id),
            },
            {
              label: "Delete Member",
              onClick: () => console.log("Delete", item.id),
            },
          ]}/>
      </ContainerCard>
    </div>
  );
}
