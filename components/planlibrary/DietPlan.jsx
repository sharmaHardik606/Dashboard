"use client";

import FilterBar from "@/components/sharedcomponents/FilterBar";
import Table from "../sharedcomponents/Table";
import { ContainerCard } from "../sharedcomponents/ContainerCard";
import { DietData, DietColumns } from "@/constants/planlibrary/dietData";

export default function DietPlan() {
  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        primaryButton={{
          label: "Filters",
          onClick: () => console.log("Open filters modal or dropdown"),
        }}
        label="Search Plans"
        placeHolder="Search by Name / type"
      />

      <ContainerCard>
        <Table data={DietData} columns={DietColumns}
                getActions={(item) => [
                    { label: "View/Edit", onClick: () => handleView(item.id) },
                    {
                      label: "Assign ",
                      onClick: () => console.log("Assign", item.id),
                    },
                    {
                      label: "Dublicate",
                      onClick: () => console.log("Dublicate", item.id),
                    },
                    {
                      label: "Delete",
                      onClick: () => console.log("Delete", item.id),
                    },
                  ]}/>
      </ContainerCard>
    </div>
  );
}
