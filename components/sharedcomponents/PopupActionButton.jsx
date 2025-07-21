
"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PopupMenu({
  trigger,           // JSX button/icon )
  items = [],        // Array of { label, onClick }
  customContent,     // Optional: Custom JSX instead of default list
  align = "right",   // "right" or "left"
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = () => {
    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = 150;
    const shouldFlipUp = rect.bottom + dropdownHeight > window.innerHeight;

    const left = align === "left"
      ? rect.left + window.scrollX
      : rect.right - 160 + window.scrollX;

    setPos({
      top: shouldFlipUp
        ? rect.top + window.scrollY - dropdownHeight
        : rect.bottom + window.scrollY,
      left,
    });

    setOpen((prev) => !prev);
  };

  return (
    <>
      <div ref={triggerRef} onClick={toggle} className="inline-block">
        {trigger}
      </div>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute z-50 w-42 p-2 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
            style={{ top: pos.top, left: pos.left }}
          >
            {customContent ? (
              customContent
            ) : (
              items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-muted hover:text-black dark:hover:text-white rounded-sm hover:cursor-pointer active:bg-gray-200"
                >
                  {item.label}
                </button>
              ))
            )}
          </div>,
          document.body
        )}
    </>
  );
}
