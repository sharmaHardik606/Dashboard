'use client';

import { useState } from 'react';
import ReportsSidebar from '@/components/reports/ReportsSidebar';
import ExportSection from '@/components/reports/ExportSection';

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('members-list');

  const renderReport = () => {
    switch (activeReport) {
      case 'members-list':
        return (
          <ExportSection
            title="Members List Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            filters={['Membership Plan', 'Status']}
            showDateRange={true}
            showFilters={true}
            showFormat={true}
            onExport={() => console.log('Export Members List')}
          />
        );

      case 'new-signups':
        return (
          <ExportSection
            title="New Signups Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            showDateRange={true}
            showFilters={false}
            showFormat={true}
            onExport={() => console.log('Export New Signups')}
          />
        );

      case 'membership-expiry':
        return (
          <ExportSection
            title="Membership Expiry Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            showDateRange={true}
            showFilters={false}
            showFormat={true}
            onExport={() => console.log('Export Expiry')}
          />
        );

      case 'payment-summary':
        return (
          <ExportSection
            title="Payment Summary Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            filters={['Payment Status', 'Payment Method']}
            showDateRange={true}
            showFilters={true}
            showFormat={true}
            onExport={() => console.log('Export Payments')}
          />
        );

      case 'revenue-by-plan':
        return (
          <ExportSection
            title="Revenue by Plan Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            showDateRange={true}
            showFilters={false}
            showFormat={true}
            onExport={() => console.log('Export Revenue')}
          />
        );

      case 'attendance-log':
        return (
          <ExportSection
            title="Attendance Log Report"
            defaultStartDate="2025-04-25"
            defaultEndDate="2025-05-03"
            filters={['Check-in Method']}
            showDateRange={true}
            showFilters={true}
            showFormat={true}
            onExport={() => console.log('Export Attendance')}
          />
        );

      default:
        return <div>Please select a report.</div>;
    }
  };

  return (
    <div className="p-3 space-y-6">
      <h1 className="text-3xl font-semibold">Reports</h1>

      <div className="flex gap-4 w-full">
        <div className="w-1/3">
          <ReportsSidebar active={activeReport} onSelect={setActiveReport} />
        </div>
        <div className="w-2/3">{renderReport()}</div>
      </div>
    </div>
  );
}
