import ChartCard from "@/components/cards/ChartCard";
import { ContainerCard } from "@/components/cards/ContainerCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { statsData } from "@/app/data/dashboardState";
import RecentActivity from "@/sections/RecentActivity";

export default function DashboardPage() {
    return (
    <div className="p-3 space-y-6 ">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold ">Dashboard</h1>
            <div className="flex gap-2 items-center">
            <Button variant={'hollow'} size={"xl"}>
                <Plus />
                Log Payment
            </Button>
            <Button variant={'mainblue'} size={"xl"}>
                <Plus />Add New Member
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

    <ContainerCard >
        <RecentActivity />
    </ContainerCard>

    </div>
    );
}