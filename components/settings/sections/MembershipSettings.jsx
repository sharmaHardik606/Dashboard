"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Table from "@/components/sharedcomponents/Table";
import Modal from "@/components/sharedcomponents/Modal";
import { AddMembershipPlanForm } from "../forms/AddMembershipPlanForm";

export default function MembershipSettings() {
  const [showAdd, setShowAdd] = useState(false);


  const membershipColumns = [
    { key: "planName", header: "Plan Name" },
    { key: "price", header: "Price" },
    { key: "duration", header: "Duration" },
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

  const membershipPlans = [
    {
      planName: "Basic",
      price: "2000",
      duration: "Monthly",
      status: "active",
    },
    {
      planName: "Premium",
      price: "12000",
      duration: "Yearly",
      status: "active",
    },
    {
      planName: "Student",
      price: "1500",
      duration: "Monthly",
      status: "active",
    },
    {
      planName: "Silver",
      price: "6500",
      duration: "Quaterly",
      status: "inactive",
    },
  ];

  function handleAdd(planData) {
    setShowAdd(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-3xl font-semibold mb-2">Membership Plans</h2>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowAdd(true)}
        >
          <Plus strokeWidth={3} />
          Add New plan
        </Button>
      </div>
      <Table
        columns={membershipColumns}
        data={membershipPlans}
        getActions={(item) => [
          { label: "Activate", onClick: () => console.log("Activate", item.id) },
          { label: "Deactivate", onClick: () => console.log("Deactivate", item.id) },
          { label: "Edit", onClick: () => console.log("Edit", item.id) },
          { label: "Delete", onClick: () => console.log("Delete", item.id) },
        ]}
      />
      {showAdd && (
        <Modal>
          <AddMembershipPlanForm
            onCancel={() => setShowAdd(false)}
            onSubmit={handleAdd}
          />
        </Modal>
      )}
    </div>
  );
}
