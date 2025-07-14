"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { invoices as allInvoices } from "@/constants/payments/invoices";
import { EllipsisVertical } from "lucide-react";
import { createPortal } from "react-dom";

export default function InvoiceTable({ filter, limit }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, flipUp: false });
  const buttonRefs = useRef({});
  const dropdownRefs = useRef({});
  const router = useRouter();

  const filteredInvoices =
    filter === "all"
      ? allInvoices
      : allInvoices.filter((inv) => inv.status === filter);

  const displayedInvoices = limit
    ? filteredInvoices.slice(0, limit)
    : filteredInvoices;

  useEffect(() => {
    function handleClickOutside(e) {
      Object.entries(dropdownRefs.current).forEach(([id, ref]) => {
        const button = buttonRefs.current[id];
        if (
          ref &&
          !ref.contains(e.target) &&
          button &&
          !button.contains(e.target)
        ) {
          setOpenDropdownId(null);
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = (id) => router.push(`/invoices/${id}`);
  const handleDownload = (id) => console.log("Download invoice", id);

  const handleToggleDropdown = (id) => {
    const button = buttonRefs.current[id];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const dropdownHeight = 150;

    const shouldFlipUp = rect.bottom + dropdownHeight > window.innerHeight;

    setDropdownPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      flipUp: shouldFlipUp,
    });

    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto relative">
        <table className="w-full">
          <thead className="text-left capitalize bg-blue-100 mb-2">
            <tr>
              <th className="p-4 text-sm font-semibold rounded-l-xl">Invoice ID</th>
              <th className="p-4 text-sm font-semibold">Name</th>
              <th className="p-4 text-sm font-semibold">Amount</th>
              <th className="p-4 text-sm font-semibold">Renewal Date</th>
              <th className="p-4 text-sm font-semibold">Status</th>
              <th className="p-4 text-sm font-semibold rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedInvoices.map((inv) => {
              const actions = [
                { label: "View Invoice", onClick: () => handleView(inv.id) },
                { label: "Download PDF", onClick: () => handleDownload(inv.id) },
              ];

              return (
                <tr key={inv.id} className="text-sm text-muted-foreground relative">
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
                  <td className="p-1 relative">
                    <button
                      ref={(el) => (buttonRefs.current[inv.id] = el)}
                      onClick={() => handleToggleDropdown(inv.id)}
                      className="p-2 rounded-full text-black hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <EllipsisVertical className="cursor-pointer" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {openDropdownId &&
        createPortal(
          <div
            ref={(el) => (dropdownRefs.current[openDropdownId] = el)}
            className="absolute p-2 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md z-[9999] text-sm text-muted-foreground transition-all duration-200 ease-in-out"
            style={{
              top: dropdownPosition.flipUp
                ? dropdownPosition.top - 150 + 40 // shift up
                : dropdownPosition.top + 40, // 40px below button
              left: dropdownPosition.left - 160 + 32, // align with button
            }}
          >
            {[
              {
                label: "View Invoice",
                onClick: () => {
                  handleView(openDropdownId);
                  setOpenDropdownId(null);
                },
              },
              {
                label: "Download PDF",
                onClick: () => {
                  handleDownload(openDropdownId);
                  setOpenDropdownId(null);
                },
              },
            ].map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className="w-full text-left px-4 py-2 font-semibold hover:bg-muted transition-colors rounded-sm hover:text-black dark:hover:text-white"
              >
                {action.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}


