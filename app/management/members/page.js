"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import Table from "@/components/sharedcomponents/Table";
import { Data } from "@/constants/management/data";
import { memberColumns } from "@/constants/management/columns";
import { Plus, HardDriveDownload } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/sharedcomponents/FilterBar";
import AddMemberForm from "@/components/management/AddMemberForm";
import Modal from "@/components/sharedcomponents/Modal";

export default function MembersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showForm = searchParams.get("showForm") === "1";

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
          <Button
            variant="mainblue"
            size="xl"
            onClick={() => router.push("/management/members?showForm=1")}
          >
            <Plus strokeWidth={3} />
            Add New Member
          </Button>
        </div>
      </div>

      {showForm && (
        <Modal
          isOpen={showForm}
          onClose={() => router.push("/management/members")}
        >
          <AddMemberForm onCancel={() => router.push("/management/members")} />
        </Modal>
      )}

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
        <Table
          columns={memberColumns}
          data={filteredData}
          getActions={(item) => [
            { label: "View/Edit", onClick: () => console.log("View", item.id) },
            {
              label: "Assign Workout",
              onClick: () => console.log("Workout", item.id),
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
    </div>
  );
}
