import ChartCard from "@/components/dashboard/cards/ChartCard";
import { ContainerCard } from "@/components/ui/ContainerCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { statsData } from "@/constants/dashboard/dashboardState";
import RecentActivitySection from "@/components/dashboard/sections/RecentActivitySection";
import NotificationSection from "@/components/dashboard/sections/NotificationSection";

export default function DashboardPage() {
  return (
    <div className="p-3 space-y-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold ">Dashboard</h1>
        <div className="flex gap-2 items-center">
          <Button variant={"hollow"} size={"xl"}>
            <Plus strokeWidth={3}/>
            Log Payment
          </Button>
          <Button variant={"mainblue"} size={"xl"}>
            <Plus strokeWidth={3}/>
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

      <div className="flex gap-4">
        <div className="flex-grow">
          <ContainerCard>
            <RecentActivitySection />
          </ContainerCard>
        </div>

        <div className="w-[300px] shrink-0">
          <ContainerCard>
            <NotificationSection />
          </ContainerCard>
        </div>
      </div>

    </div>
  );
}
