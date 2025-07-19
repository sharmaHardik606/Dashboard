"use client";

import { ContainerCard } from "../sharedcomponents/ContainerCard";
import SettingsSidebar from "./SettingsSidebar";
import { useState, useEffect } from "react";
import GeneralSettings from "./sections/GeneralSettings";
import UserRoleSettings from "./sections/UserRoleSettings";
import MembershipSettings from "./sections/MembershipSettings";
import BillingSettings from "./sections/BillingSettings";
import AttendanceSettings from "./sections/AttendanceSettings";
import CommunicationSettings from "./sections/CommunicationSettings";
import { useIsMobile } from "../messages/hooks/useIsMobile";
import { ArrowLeft } from "lucide-react";


export default function SettingsLayout() {
  const [activeSection, setActiveSection] = useState("general-settings");
  const generateKey = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const isMobile = useIsMobile();
  const [showContent, setShowContent] = useState(!isMobile);

  useEffect(() => {
    setShowContent(!isMobile); // Reset on screen resize
  }, [isMobile]);

  const renderContent = () => {
    return (
      <>
        {activeSection === "general-settings" && <GeneralSettings />}
        {activeSection === generateKey("User & Role Management") && <UserRoleSettings />}
        {activeSection === "membership-plan-settings" && <MembershipSettings />}
        {activeSection === generateKey("billing & payment-settings") && <BillingSettings />}
        {activeSection === "attendance-system-settings" && <AttendanceSettings />}
        {activeSection === "communication-settings" && <CommunicationSettings />}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {/* Sidebar */}
      {(!isMobile || !showContent) && (
        <div className="w-full md:w-1/4">
          <SettingsSidebar
            active={activeSection}
            onChange={(section) => {
              setActiveSection(section);
              if (isMobile) setShowContent(true);
            }}
          />
        </div>
      )}

      {/* Content */}
      {(!isMobile || showContent) && (
        <ContainerCard className="w-full md:w-3/4">
          {isMobile && (
            <button
              className="mb-4 text-sm"
              onClick={() => setShowContent(false)}
            >
              <ArrowLeft />
            </button>
          )}
          {renderContent()}
        </ContainerCard>
      )}
    </div>
  );
}