"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import Table from "@/components/sharedcomponents/Table";
import { Data } from "@/constants/management/data";
import { memberColumns } from "@/constants/management/columns";
import { Plus, HardDriveDownload } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/sharedcomponents/FilterBar";
import AddMemberForm from "@/components/management/members/AddMemberForm";
import Modal from "@/components/sharedcomponents/Modal";
import ImportMembersCSVPanel from "@/components/management/members/ImportMembersCSVPanel";
import MemberFiltersModal from "@/components/management/members/MemberFilterModal";

// ✅ Import your ViewEditMember component here
import ViewEditMember from "@/components/management/members/view-edit/ViewEditMember";

export default function MembersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Existing
  const showForm = searchParams.get("showForm") === "1";

  // ✅ New params for action modals
  const action = searchParams.get("action");
  const memberId = searchParams.get("id");

  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const filteredData = Data.filter((item) => item.type === "member");
  const [searchQuery, setSearchQuery] = useState("");
  const [showImportSection, setShowImportSection] = useState(false);

  const closeModal = () => {
    router.push("/management/members"); // Clears query params
  };

  // Existing Import Section logic
  if (showImportSection) {
    return (
      <div className="p-3 space-y-6">
        <ImportMembersCSVPanel
          onCancel={() => setShowImportSection(false)}
          onImport={(importedMembers) => {
            setShowImportSection(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Members</h1>
        <div className="flex gap-2">
          <Button
            variant="hollow"
            size="xl"
            onClick={() => setShowImportSection(true)}
          >
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

      {/* Existing Add Form Modal */}
      {showForm && (
        <Modal isOpen={showForm} onClose={closeModal}>
          <AddMemberForm onCancel={closeModal} />
        </Modal>
      )}

      {/* ✅ New Action Modal Logic (only if action param exists) */}
      {action && (
        <Modal isOpen={!!action} onClose={closeModal}>
          {action === "view" && (
            <ViewEditMember
              member={Data.find((m) => m.id === memberId)}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}

      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        primaryButton={{
          label: "Filters",
          onClick: () => setFiltersModalOpen(true),
        }}
        label="Search Members"
      />

      <MemberFiltersModal
        open={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
      />

      <ContainerCard>
        <Table
          columns={memberColumns}
          data={filteredData}
          getActions={(item) => [
            {
              label: "View/Edit",
              onClick: () =>
                router.push(`/management/members?action=view&id=${item.id}`),
            },
            {
              label: "Assign Workout",
              onClick: () => console.log("Workout", item.id), // placeholder
            },
            {
              label: "Assign Diet",
              onClick: () => console.log("Assign Diet", item.id), // placeholder
            },
            {
              label: "Delete Member",
              onClick: () => console.log("Delete", item.id), // placeholder
            },
          ]}
        />
      </ContainerCard>
    </div>
  );
}
