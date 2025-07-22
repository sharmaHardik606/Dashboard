"use client";

import { Button } from "@/components/ui/button"; // or use a native button

export default function SuccessPopup({
  message = "Operation successful!",
  buttonText = "Okay",
  onClose = () => {},
}) {
  return (
    <div className="text-center px-6 py-8">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-600"
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
      <h2 className="text-xl font-semibold text-green-600 mb-2">Success!</h2>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <Button onClick={onClose} variant={"mainblue"} className={"w-full"}>
        {buttonText}
      </Button>
    </div>
  );
}
