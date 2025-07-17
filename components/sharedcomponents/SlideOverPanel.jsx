"use client";

import { X } from "lucide-react";

export default function SlideOverPanel({ isOpen, onClose, title, children }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Slide-in panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
