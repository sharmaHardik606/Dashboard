"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContainerCard } from "@/components/ui/ContainerCard";
import InvoiceTable from "@/components/payment/InvoiceTable";
import PaymentOverview from "@/components/payment/PaymentOverview";
import { overviewStats } from "@/constants/payments/overviewStats";
import { Plus } from "lucide-react";

export default function PaymentPage() {
  const [filter, setFilter] = useState("overview");

  const filters = [
    { key: "overview", label: "Overview" },
    { key: "all", label: "Invoices" },
    { key: "paid", label: "Paid Payments" },
    { key: "pending", label: "Pending Payments" },
  ];

  return (
    <div className="p-3 space-y-6">
      <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold ">Payment Overview</h1>
              <div className="flex items-center">
                <Button variant={"mainblue"} size={"xl"}>
                  <Plus strokeWidth={3}/>
                  Log Payment
                </Button>
              </div>
            </div>

      <div className="flex gap-2">
        {filters.map((tab) => (
          <Button
            key={tab.key}
            variant={filter === tab.key ? "default" : "outline"}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {filter === "overview" ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {overviewStats.map((stat, i) => (
              <PaymentOverview key={i} {...stat} />
            ))}
          </div>

          <ContainerCard>
            <InvoiceTable filter="all" limit={5} />
          </ContainerCard>
        </>
      ) : (
        <ContainerCard>
          <InvoiceTable filter={filter} />
        </ContainerCard>
      )}
    </div>
  );
}
