"use client";

import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import Table from "@/components/sharedcomponents/Table";
import { Data } from "@/constants/management/data";
import { attendanceColumns } from "@/constants/management/columns";
import { useState, useEffect } from "react";
import FilterBar from "@/components/sharedcomponents/FilterBar";
import QrCodeModal from "@/components/management/attandance/QrCodeModal";
import AttendanceFiltersModal from "@/components/management/attandance/AttendanceFiltersModal"

export default function AttendancePage() {
  const filteredData = Data.filter((item) => item.checkInTime && item.method);
  const [searchQuery, setSearchQuery] = useState("");

  const [today, setToday] = useState("");

  const [showQrModal, setShowQrModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false); // New filter modal state

  const qrValue = "AyuProfit-QR-Placeholder"; // replace later

  useEffect(() => {
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

    setToday(`${date} - ${time}`);
  }, []);

  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Mark Attendance</h1>
        <div className="flex items-center text-sm font-semibold capitalize">{today}</div>
      </div>

      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        primaryButton={{
          label: "Filters",
          onClick: () => setShowFilterModal(true), // ✅ open filter modal
        }}
        secondaryButton={{
          label: "Scan QR",
          onClick: () => setShowQrModal(true),
        }}
        label="Search Members/Staff or Scan ID/QR"
      />

      <ContainerCard>
        <Table
          data={filteredData}
          columns={attendanceColumns}
          getActions={(item) => [
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
          ]}
        />
      </ContainerCard>

      {/* QR Code Modal */}
      <QrCodeModal
        open={showQrModal}
        onClose={() => setShowQrModal(false)}
        value={qrValue}
      />

      {/* Filters Modal */}
      <AttendanceFiltersModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </div>
  );
}
