"use client";

import { ContainerCard } from "../sharedcomponents/ContainerCard";
import SettingsSidebar from "./SettingsSidebar";
import { useState } from "react";
import GeneralSettings from "./sections/GeneralSettings";
import UserRoleSettings from "./sections/UserRoleSettings";
import MembershipSettings from "./sections/MembershipSettings";
import BillingSettings from "./sections/BillingSettings";
import AttendanceSettings from "./sections/AttendanceSettings";
import CommunicationSettings from "./sections/CommunicationSettings";

export default function SettingsLayout() {
  const [activeSection, setActiveSection] = useState("general");

  return (
    <div className="w-full flex h-screen gap-4">
      <div className="w-1/4">
        <SettingsSidebar active={activeSection} onChange={setActiveSection} />
      </div>

      <ContainerCard className={"w-3/4"}>
        <h2 className="text-2xl font-semibold mb-4">{activeSection}</h2>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          {activeSection === "general-settings" && <GeneralSettings />}
          {activeSection === "user-&-role-management" && <UserRoleSettings />}
          {activeSection === "membership-plan-settings" && (
            <MembershipSettings />
          )}
          {activeSection === "billing-&-payment-settings" && (
            <BillingSettings />
          )}
          {activeSection === "attendance-system-settings" && (
            <AttendanceSettings />
          )}
          {activeSection === "communication-settings" && (
            <CommunicationSettings />
          )}
        </div>
      </ContainerCard>
    </div>
  );
}
