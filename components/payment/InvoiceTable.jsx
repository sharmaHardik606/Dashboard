import { invoices as allInvoices } from "@/constants/payments/invoices";

export default function InvoiceTable({ filter, limit }) {
  const filteredInvoices =
    filter === "all"
      ? allInvoices
      : allInvoices.filter((inv) => inv.status === filter);

  // Apply limit if provided
  const displayedInvoices = limit
    ? filteredInvoices.slice(0, limit)
    : filteredInvoices;

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto ">
        <table className="w-full">
          <thead className="rounded-2xl text-left capitalize bg-blue-100 mb-2">
            <tr>
              <th className="p-4 rounded-l-xl">Invoice ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Renewal Date</th>
              <th className="p-4 rounded-r-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedInvoices.map((inv) => (
              <tr key={inv.id} className="text-foreground">
                <td className="p-4">{inv.id}</td>
                <td className="p-4">{inv.name}</td>
                <td className="p-4">{inv.amount}</td>
                <td className="p-4">{inv.date}</td>
                <td className="p-4 capitalize">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                      inv.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
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
