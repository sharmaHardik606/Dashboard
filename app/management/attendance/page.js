"use client";

import { ContainerCard } from "@/components/ui/ContainerCard";
import Table from "@/components/ui/Table";
import { Data } from "@/constants/management/data";
import { attendanceColumns } from "@/constants/management/columns";
import { useState, useEffect } from "react";

export default function AttendancePage() {
  const filteredData = Data.filter((item) => item.checkInTime && item.method);

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

      <ContainerCard>
        <Table data={filteredData} columns={attendanceColumns} />
      </ContainerCard>
    </div>
  );
}
