"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/auth";

import ChartCard from "@/components/dashboard/cards/ChartCard";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { statsData } from "@/constants/dashboard/dashboardState";
import RecentActivitySection from "@/components/dashboard/sections/RecentActivitySection";
import NotificationSection from "@/components/dashboard/sections/NotificationSection";

export default function DashboardPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) return null;

  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        <div className="flex gap-2">
          <Button variant="hollow" size="lg">
            <Plus strokeWidth={3} />
            Log Payment
          </Button>
          <Button variant="mainblue" size="lg">
            <Plus strokeWidth={3} />
            Add New Member
          </Button>
        </div>
      </div>

      <ContainerCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {statsData.map((stat, i) => (
            <ChartCard key={i} {...stat} />
          ))}
        </div>
      </ContainerCard>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-grow">
          <ContainerCard>
            <RecentActivitySection />
          </ContainerCard>
        </div>

        <div className="w-full lg:w-auto shrink-0">
          <ContainerCard>
            <NotificationSection />
          </ContainerCard>
        </div>
      </div>
    </div>
  );
}
