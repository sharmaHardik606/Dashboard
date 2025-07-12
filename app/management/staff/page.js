"use client";

import { ContainerCard } from "@/components/ui/ContainerCard";
import Table from "@/components/ui/Table";
import { Data } from "@/constants/management/data";
import { staffColumns } from "@/constants/management/columns";
import { Plus, HardDriveDownload } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function StaffPage() {
  const filteredData = Data.filter((item) => item.type === "staff");

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

    <ContainerCard>
      <Table data={filteredData} columns={staffColumns} />
    </ContainerCard>
    </div>
  );
}
