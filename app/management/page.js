"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Data } from "@/constants/management/data";
import { ContainerCard } from "@/components/ui/ContainerCard";
import Table from "@/components/ui/Table";
import {
  memberColumns,
  staffColumns,
  attendanceColumns,
} from "@/constants/management/columns";

export default function ManagementPage() {
  const [filter, setFilter] = useState("members");

  const filteredData =
    filter === "members"
      ? Data.filter((item) => item.type === "member")
      : filter === "staff"
      ? Data.filter((item) => item.type === "staff")
      : Data.filter((item) => item.checkInTime && item.method);

  const columns =
    filter === "members"
      ? memberColumns
      : filter === "staff"
      ? staffColumns
      : attendanceColumns;

  return (
    <div className="p-3 space-y-6">
      

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["members", "staff", "attendance"].map((tab) => (
          <Button
            key={tab}
            variant={filter === tab ? "default" : "outline"}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Table */}
      <ContainerCard>
        <Table columns={columns} data={filteredData} />
      </ContainerCard>
    </div>
  );
}



