'use client';

import ExportSection from '@/components/reports/ExportSection';
import ReportsSidebar from '@/components/reports/ReportsSidebar';
import { generateMembersReport } from '@/lib/api/reports';
import { membersReportFilters } from '@/constants/reports/members';

export default function MembersListPage() {
  return (
    <div className="p-3 space-y-6">
      <h1 className="text-3xl font-semibold">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ReportsSidebar />
        

        <div className="col-span-3">
          <ExportSection
            title="Members List Report"
            defaultStartDate="2025-04-01"
            defaultEndDate="2025-05-01"
            filters={membersReportFilters}
            onExport={generateMembersReport}
          />
        </div>
      </div>
    </div>
  );
}

