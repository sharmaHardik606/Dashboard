"use client";

import { Button } from "@/components/ui/button"; 
import { useEffect } from "react";

export default function SuccessPopup({
  message = "Operation successful!",
  buttonText = "Okay",
  onClose = () => {},
  showButton = true,
  autoClose = 2000,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, autoClose);
    return () => clearTimeout(timer);
  }, [onClose, autoClose]);
  return (
    <div className="text-center px-6 py-8">
      <div className="flex justify-center mb-4">
        <div className="w-35 h-35 rounded-full bg-emerald-600 flex items-center justify-center">
          <svg
            className="w-25 h-25 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-emerald-600 mb-2">Success!</h2>
      <p className="text-base text-gray-600 mb-6">{message}</p>
      {showButton && ( 
        <Button onClick={onClose} variant={"mainblue"} className={"w-full"}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
