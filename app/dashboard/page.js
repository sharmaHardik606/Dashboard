"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import ChartCard from "@/components/dashboard/cards/ChartCard";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { statsData } from "@/constants/dashboard/dashboardState";
import RecentActivitySection from "@/components/dashboard/sections/RecentActivitySection";
import NotificationSection from "@/components/dashboard/sections/NotificationSection";
import Modal from "@/components/sharedcomponents/Modal";
import AddMemberForm from "@/components/management/members/AddMemberForm";

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const showAddMemberModal = searchParams.get("showForm") === "1";

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("showForm", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // This value could be used, but overlay/modal is now handled in the layout!
  // const isProfileComplete = useSelector(
  //   (state) => state.profile.isProfileComplete
  // );

  return (
    <div className="relative">
      <div className="p-3 space-y-6 transition-all duration-300">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex gap-2">
            <Button
              variant="hollow"
              size="lg"
              onClick={() => router.push("/payment?showForm=1")}
            >
              <Plus strokeWidth={3} />
              Log Payment
            </Button>
            <Button
              variant="mainblue"
              size="lg"
              onClick={() => router.push("/management/members?showForm=1")}
            >
              <Plus strokeWidth={3} />
              Add New Member
            </Button>
          </div>
        </div>

        {/* Chart Stats */}
        <ContainerCard>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {statsData.map((stat, i) => (
              <ChartCard key={i} {...stat} />
            ))}
          </div>
        </ContainerCard>

        {/* Sections */}
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

        {/* Modal via ?showForm=1 */}
        <Modal>
          <AddMemberForm />
        </Modal>
      </div>
    </div>
  );
}
