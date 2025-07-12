"use client";

import { ContainerCard } from "@/components/ui/ContainerCard";
import Table from "@/components/ui/Table";
import { Data } from "@/constants/management/data";
import { staffColumns } from "@/constants/management/columns";

export default function StaffPage() {
  const filteredData = Data.filter((item) => item.type === "staff");

  return (
    <ContainerCard>
      <Table data={filteredData} columns={staffColumns} />
    </ContainerCard>
  );
}
