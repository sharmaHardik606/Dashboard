"use client";

import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import Table from "@/components/management/Table";
import { Data } from "@/constants/management/data";
import { staffColumns } from "@/constants/management/columns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/sharedcomponents/FilterBar";
import { useState } from "react";

export default function StaffPage() {
  const filteredData = Data.filter((item) => item.type === "staff");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Staff Management</h1>
        <div className="flex gap-2">
          <Button variant="mainblue" size="xl">
            <Plus strokeWidth={3} />
            Add New Staff
          </Button>
        </div>
      </div>

      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        primaryButton={{
          label: "Filters",
          onClick: () => console.log("Filters clicked"),
        }}
        label="Search Staff"
      />

      <ContainerCard>
        <Table data={filteredData} columns={staffColumns} />
      </ContainerCard>
    </div>
  );
}
