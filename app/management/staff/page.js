"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import Table from "@/components/sharedcomponents/Table";
import { Data } from "@/constants/management/data";
import { staffColumns } from "@/constants/management/columns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/sharedcomponents/FilterBar";
import Modal from "@/components/sharedcomponents/Modal";
import AddStaffForm from "@/components/management/AddStaffForm";
import { useState } from "react";

export default function StaffPage() {
  const filteredData = Data.filter((item) => item.type === "staff");
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const showForm = searchParams.get("showForm") === "1";
  const router = useRouter();

  const handleView = (id) => {
    console.log("View/Edit", id);
  };

  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Staff Management</h1>
        <div className="flex gap-2">
          <Button
            variant="mainblue"
            size="xl"
            onClick={() => router.push("?showForm=1")}
          >
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
        <Table
          data={filteredData}
          columns={staffColumns}
          getActions={(item) => [
            { label: "View/Edit", onClick: () => handleView(item.id) },
            {
              label: "Assign Member",
              onClick: () => console.log("Assign Member", item.id),
            },
            {
              label: "Delete Member",
              onClick: () => console.log("Delete", item.id),
            },
          ]}
        />
      </ContainerCard>

      {/* Modal for Add Staff */}
      {showForm && (
        <Modal onClose={() => router.push("/management/staff")}>
          <AddStaffForm />
        </Modal>
      )}
    </div>
  );
}
