"use client";

import { EllipsisVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Table({ columns, data, getActions }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef({});
  const dropdownRefs = useRef({});
  const router = useRouter();

  // Close dropdown if clicked outside
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

  // Toggle dropdown open/close with auto-flip
  const handleToggleDropdown = (rowId) => {
    const button = buttonRefs.current[rowId];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const dropdownHeight = 150; // Estimate

    const shouldFlipUp = rect.bottom + dropdownHeight > window.innerHeight;

    setDropdownPosition({
      top: shouldFlipUp
        ? rect.top + window.scrollY - dropdownHeight
        : rect.bottom + window.scrollY,
      left: rect.right - 160 + window.scrollX,
    });

    setOpenDropdownId((prev) => (prev === rowId ? null : rowId));
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto relative">
        <table className="w-full">
          <thead className="text-left capitalize bg-blue-100 mb-2">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`p-4 text-sm font-semibold ${
                    i === 0 ? "rounded-l-md" : ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
              <th className="p-4 text-sm font-semibold rounded-r-md">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, idx) => {
              const rowId = item.id ?? idx; // fallback to index if no ID
              const actions = getActions?.(item) ?? [];

              return (
                <tr key={rowId} className="text-sm text-muted-foreground relative">
                  {columns.map((col) => (
                    <td key={col.key} className="p-4 capitalize">
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  ))}

                  <td className="relative">
                    <button
                      ref={(el) => (buttonRefs.current[rowId] = el)}
                      onClick={() => handleToggleDropdown(rowId)}
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

      {openDropdownId != null &&
        createPortal(
          <div
            ref={(el) => (dropdownRefs.current[openDropdownId] = el)}
            className="absolute p-2 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md z-50 text-sm text-muted-foreground transition-all duration-200 ease-in-out"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
          >
            {(getActions?.(data.find((item, idx) =>
              (item.id ?? idx) === openDropdownId
            )) ?? []).map((action, i) => (
              <button
                key={i}
                onClick={() => {
                  action.onClick();
                  setOpenDropdownId(null);
                }}
                className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors rounded-sm hover:text-black dark:hover:text-white hover:cursor-pointer"
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
