'use client';

import ExportSection from '@/components/reports/ExportSection';
import { generateNewSignupsReport } from '@/lib/api/reports';

export default function NewSignupsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Reports</h1>

      <ExportSection
        title="New Sign-ups Report"
        defaultStartDate="2025-04-01"
        defaultEndDate="2025-05-01"
        filters={[
          {
            name: 'status',
            label: 'Signup Status',
            options: ['All', 'Verified', 'Pending'],
          },
        ]}
        onExport={(params) => {
          console.log('Sending export request:', params);
          generateNewSignupsReport(params);
        }}
      />
    </div>
  );
}
