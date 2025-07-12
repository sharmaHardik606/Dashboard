"use client";

import { ContainerCard } from "@/components/ui/ContainerCard";
import Table from "@/components/ui/Table";
import { Data } from "@/constants/management/data";
import { memberColumns } from "@/constants/management/columns";

export default function MembersPage() {
  const filteredData = Data.filter((item) => item.type === "member");

  return (
    <ContainerCard>
      <Table data={filteredData} columns={memberColumns} />
    </ContainerCard>
  );
}
