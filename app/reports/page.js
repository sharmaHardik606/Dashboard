"use client";

import { useState, useEffect } from "react";
import ReportsSidebar from "@/components/reports/ReportsSidebar";
import ExportSection from "@/components/reports/ExportSection";
import { ArrowLeft } from "lucide-react";

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState(null); 
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebarOnly, setShowSidebarOnly] = useState(true);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);

      if (!isMobile && activeReport === null) {
        // If desktop and no report selected yet → set default
        setActiveReport("members-list");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeReport]);

  const handleSelect = (key) => {
    setActiveReport(key);
    if (isMobileView) {
      setShowSidebarOnly(false);
    }
  };

  const renderReport = () => {
    if (!activeReport) {
      return (
        <div className="text-gray-500 text-sm">Please select a report.</div>
      );
    }

    switch (activeReport) {
      case "members-list":
        return (
          <ExportSection
            title="Members List Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            filters={["Membership Status", "Membership Plan"]}
            showDateRange={true}
            showFilters={true}
            showFormat={true}
            onExport={() => console.log("Export Members List")}
          />
        );
      case "new-signups":
        return (
          <ExportSection
            title="New Signups Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            showDateRange={true}
            showFilters={false}
            showFormat={true}
            onExport={() => console.log("Export New Signups")}
          />
        );
      case "membership-expiry":
        return (
          <ExportSection
            title="Membership Expiry Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            showDateRange={true}
            showFilters={false}
            showFormat={true}
            onExport={() => console.log("Export Expiry")}
          />
        );
      case "payment-summary":
        return (
          <ExportSection
            title="Payment Summary Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            filters={["Payment Status", "Payment Method"]}
            showDateRange={true}
            showFilters={true}
            showFormat={true}
            onExport={() => console.log("Export Payments")}
          />
        );
      case "revenue-by-plan":
        return (
          <ExportSection
            title="Revenue by Plan Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            showDateRange={true}
            showFilters={false}
            showFormat={true}
            onExport={() => console.log("Export Revenue")}
          />
        );
      case "attendance-log":
        return (
          <ExportSection
            title="Attendance Log Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            filters={["User Type", "Check-in Method"]}
            showDateRange={true}
            showFilters={true}
            showFormat={true}
            onExport={() => console.log("Export Attendance")}
          />
        );
      default:
        return <div>Please select a report.</div>;
    }
  };

  return (
    <div className="p-3 space-y-6">
      <h1 className="text-3xl font-semibold">Reports</h1>

      <div className="w-full">
        <div className="md:flex gap-4 w-full">
          {/* Sidebar */}
          {(showSidebarOnly || !isMobileView) && (
            <div className="w-full md:w-1/3">
              <ReportsSidebar active={activeReport} onSelect={handleSelect} />
            </div>
          )}

          {/* Report View */}
          {(!showSidebarOnly || !isMobileView) && (
            <div className="w-full md:w-2/3 -mt-2">
              {isMobileView && (
                <button
                  className="py-2 text-sm md:hidden active:bg-gray-100 rounded-full self-end"
                  onClick={() => setShowSidebarOnly(true)}
                >
                  <ArrowLeft />
                </button>
              )}
              {renderReport()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
