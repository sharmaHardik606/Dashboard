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
  const generateKey = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="w-full flex gap-4">
      <div className="w-1/4">
        <SettingsSidebar active={activeSection} onChange={setActiveSection} />
      </div>

      <ContainerCard className={"w-3/4"}>
        <div className="">
          {activeSection === "general-settings" && <GeneralSettings />}
          {activeSection === generateKey("User & Role Management") && <UserRoleSettings />}
          {activeSection === "membership-plan-settings" && (
            <MembershipSettings />
          )}
          {activeSection === generateKey("billing & payment-settings") && (
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
