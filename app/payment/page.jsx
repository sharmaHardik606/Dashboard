"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import InvoiceTable from "@/components/payment/InvoiceTable";
import PaymentOverview from "@/components/payment/PaymentOverview";
import { overviewStats } from "@/constants/payments/overviewStats";
import { Plus } from "lucide-react";
import FilterBar from "@/components/sharedcomponents/FilterBar";

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">Payment Overview</h1>
        <div className="flex items-center">
          <Button variant="mainblue" size="xl">
            <Plus strokeWidth={3} className="mr-2" />
            Log Payment
          </Button>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex gap-2 flex-wrap">
        {filters.map((tab) => (
          <Button
            key={tab.key}
            variant={filter === tab.key ? "default" : "outline"}
            onClick={() => setFilter(tab.key)}
            className="text-sm"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Mobile Filter using ShadCN Select */}
      <div className="md:hidden flex gap-2">
        <Button
          variant={filter === "overview" ? "default" : "outline"}
          onClick={() => setFilter("overview")}
          className="text-sm"
        >
          Overview
        </Button>

        <Select
          value={filter === "overview" ? "" : filter}
          onValueChange={setFilter}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            {filters
              .filter((tab) => tab.key !== "overview")
              .map((tab) => (
                <SelectItem key={tab.key} value={tab.key}>
                  {tab.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Section */}
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
  <>
    
    <FilterBar
      primaryButton={{
        label: "Filters",
        onClick: () => console.log("Open filters modal or dropdown"),
      }}
      label="Search Invoices"
    />

    <ContainerCard>
      <InvoiceTable filter={filter} />
    </ContainerCard>
  </>
)}
    </div>
  );
}
