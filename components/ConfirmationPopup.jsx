"use client";

import { Button } from "@/components/ui/button";

export default function ConfirmationPopup({
  message = "Are you sure you want to proceed?",
  onConfirm,
  onCancel,
  buttonText = "Confirm", 
}) {
  return (
    <div className="text-center p-6">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-orange-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
            />
          </svg>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-6">{message}</p>
      <div className="flex gap-4 justify-center">
        <Button className="bg-blue-600 text-white px-6" onClick={onConfirm}>
          {buttonText}
        </Button>

        {onCancel && (
          <Button
            variant="outline"
            className="px-6 border-gray-300"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
