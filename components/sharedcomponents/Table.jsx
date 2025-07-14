"use client";

import { EllipsisVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Table({ columns, data, getActions  }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});
  const router = useRouter();

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

  // Action handlers – you can replace with real logic later
  const handleView = (id) => router.push(`/members/${id}`);
  const handleWorkout = (id) => router.push(`/members/${id}`);
  const handleDiet = (id) => router.push(`/members/${id}`);
  const handleDelete = (id) => router.push(`/members/${id}`);

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
              const actions = getActions ? getActions(item) : [];

              return (
                <tr
                  key={item.id || idx}
                  className="text-sm text-muted-foreground relative"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="p-4 capitalize">
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  ))}

                  <td className=" ">
                    <button
                      onClick={() =>
                        setOpenDropdownId((prev) =>
                          prev === item.id ? null : item.id
                        )
                      }
                      className="p-2 rounded-full text-black hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <EllipsisVertical className="cursor-pointer" />
                    </button>

                    {openDropdownId === item.id && (
                      <div
                        ref={(el) => (dropdownRefs.current[item.id] = el)}
                        className="absolute right-6 top-12 p-2 w-40 bg-white  dark:bg-gray-900 shadow-lg rounded-md z-50"
                      >
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              action.onClick();
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors rounded-sm hover:text-black"
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
