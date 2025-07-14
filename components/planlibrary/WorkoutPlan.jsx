"use client";

import FilterBar from "@/components/sharedcomponents/FilterBar";
import { ContainerCard } from "../sharedcomponents/ContainerCard";
import Table from "../sharedcomponents/Table";
import { WorkoutData, WorkoutColumns } from "@/constants/planlibrary/workoutData";

export default function WorkoutPlan() {
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
        <Table data={WorkoutData} columns={WorkoutColumns}
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
