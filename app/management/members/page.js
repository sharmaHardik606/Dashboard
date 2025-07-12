"use client";

import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import Table from "@/components/management/Table";
import { Data } from "@/constants/management/data";
import { memberColumns } from "@/constants/management/columns";
import { Plus, HardDriveDownload } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/sharedcomponents/FilterBar";
import { useState } from "react";

export default function MembersPage() {
  const filteredData = Data.filter((item) => item.type === "member");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Members</h1>
        <div className="flex gap-2">
          <Button variant="hollow" size="xl">
            <HardDriveDownload strokeWidth={2} />
            Import Data
          </Button>
          <Button variant="mainblue" size="xl">
            <Plus strokeWidth={3} />
            Add New Member
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
        label="Search Members"
      />

      <ContainerCard>
        <Table data={filteredData} columns={memberColumns} />
      </ContainerCard>
    </div>
  );
}
