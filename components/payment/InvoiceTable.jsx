"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { invoices as allInvoices } from "@/constants/payments/invoices";
import { EllipsisVertical } from "lucide-react";

export default function InvoiceTable({ filter, limit }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});
  const router = useRouter();

  const filteredInvoices =
    filter === "all"
      ? allInvoices
      : allInvoices.filter((inv) => inv.status === filter);

  const displayedInvoices = limit
    ? filteredInvoices.slice(0, limit)
    : filteredInvoices;

  // Close dropdown outside click
  useEffect(() => {
    function handleClickOutside(e) {
      Object.entries(dropdownRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(e.target)) {
          setOpenDropdownId(null);
        }
      });
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Future action handlers
  const handleView = (id) => router.push(`/invoices/${id}`);
  const handleDownload = (id) => {
    // Download logic 
    console.log("Download invoice", id);
  };
  

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto relative">
        <table className="w-full">
          <thead className="rounded-2xl text-left capitalize bg-blue-100 mb-2">
            <tr>
              <th className="p-4 rounded-l-xl">Invoice ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Renewal Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedInvoices.map((inv) => {
              const actions = [
                { label: "View Invoice", onClick: () => handleView(inv.id) },
                { label: "Download PDF", onClick: () => handleDownload(inv.id) },
              ];

              return (
                <tr key={inv.id} className="text-foreground relative">
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
                  <td className="p-4">
                    <button
                      onClick={() =>
                        setOpenDropdownId((prev) =>
                          prev === inv.id ? null : inv.id
                        )
                      } className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <EllipsisVertical className="cursor-pointer " />
                    </button>

                    {openDropdownId === inv.id && (
                      <div
                        ref={(el) => (dropdownRefs.current[inv.id] = el)}
                        className="absolute right-6  p-2  w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md z-1"
                      >
                        {actions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              action.onClick();
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors rounded-sm"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
