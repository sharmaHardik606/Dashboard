"use client";

import FilterBar from "@/components/sharedcomponents/FilterBar";
import { ContainerCard } from "../sharedcomponents/ContainerCard";
import Table from "../management/Table";

export default function WorkoutPlan() {
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
