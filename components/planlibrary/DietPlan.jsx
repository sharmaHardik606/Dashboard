"use client";

import FilterBar from "@/components/sharedcomponents/FilterBar";
import Table from "../management/Table";
import { ContainerCard } from "../sharedcomponents/ContainerCard";

export default function DietPlan() {
  return (
    <div>
      <FilterBar
        primaryButton={{
          label: "Filters",
          onClick: () => console.log("Open filters modal or dropdown"),
        }}
        label="Search Plans"
        placeHolder="Search by Name / type"
      />

      <ContainerCard>
        
      </ContainerCard>
    </div>
  );
}
