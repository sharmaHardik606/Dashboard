import { Button } from "@/components/ui/button";
import { Plus, HardDriveDownload } from "lucide-react";
import { members } from "@/constants/management/membersData";
import { ContainerCard } from "@/components/ui/ContainerCard";
import Table from "@/components/ui/Table";

export default function MembersPage() {
  const columns = [
    { key: "id", header: "Member ID" },
    { key: "name", header: "Name" },
    { key: "contact", header: "Contact" },
    { key: "plan", header: "Plan" },
    { key: "renewalDate", header: "Renewal Date" },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
            value === "active"
              ? "bg-green-100 text-green-700"
              : value === "expired"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-3 space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Members</h1>
        <div className="flex gap-2 items-center">
          <Button variant="hollow" size="xl">
            <HardDriveDownload strokeWidth={2} />
            Log Payment
          </Button>
          <Button variant="mainblue" size="xl">
            <Plus strokeWidth={3} />
            Add New Member
          </Button>
        </div>
      </div>

      {/* Table section */}
      <ContainerCard>
        <Table columns={columns} data={members} />
      </ContainerCard>
    </div>
  );
}

