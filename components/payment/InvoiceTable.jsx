export default function InvoiceTable({ filter }) {
  const allInvoices = [
    { id: 'INV001', name: 'John Doe', amount: '$100', status: 'paid', date: '2025-07-01' },
    { id: 'INV002', name: 'Jane Smith', amount: '$150', status: 'pending', date: '2025-07-05' },
    { id: 'INV003', name: 'Bob Brown', amount: '$200', status: 'paid', date: '2025-07-10' },
    { id: 'INV004', name: 'Harrison Ford', amount: '$200', status: 'pending', date: '2025-07-17' },
    { id: 'INV005', name: 'Tony Mark', amount: '$200', status: 'paid', date: '2025-07-12' },
  ];

  const filteredInvoices =
    filter === 'all' ? allInvoices : allInvoices.filter((inv) => inv.status === filter);

  return (
    <div className="overflow-hidden">

      {/* Table Content */}
      <div className="overflow-x-auto ">
        <table className="w-full">
          <thead className="rounded-2xl text-left text-xs uppercase bg-blue-100 mb-2">
            <tr>
              <th className="p-4">Invoice ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
  {filteredInvoices.map((inv) => (
    <tr key={inv.id} className="text-foreground">
      <td className="p-4 ">{inv.id}</td>
      <td className="p-4">{inv.name}</td>
      <td className="p-4">{inv.amount}</td>
      <td className="p-4">{inv.date}</td>
      <td className="p-4 capitalize">
        <span
          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
            inv.status === 'paid'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {inv.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}
