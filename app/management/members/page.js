import { Data } from "@/constants/management/data";
import Table from "@/components/ui/Table";
import { ContainerCard } from "@/components/ui/ContainerCard";

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
      <span className={`...`}>
        {value}
      </span>
    ),
  },
];

export default function MembersPage() {
  const filteredData = Data.filter(
    (item) => item.usertype === "member"
  );

  return (
    <ContainerCard>
      <Table data={filteredData} columns={columns} />
    </ContainerCard>
  );
}
