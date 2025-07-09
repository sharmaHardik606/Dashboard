'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContainerCard } from '@/components/ui/ContainerCard';
import InvoiceTable from '@/components/payment/InvoiceTable';

export default function PaymentPage() {
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'Invoices' },
    { key: 'paid', label: 'Paid Payments' },
    { key: 'pending', label: 'Pending Payments' },
  ];

  return (
    <div className="p-3 space-y-6">
      <h1 className="text-3xl font-semibold">Payment Overview</h1>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {filters.map((tab) => (
          <Button
            key={tab.key}
            variant={filter === tab.key ? 'default' : 'outline'}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Filtered Invoices Table */}
      <ContainerCard>
        <InvoiceTable filter={filter} />
      </ContainerCard>
    </div>
  );
}
