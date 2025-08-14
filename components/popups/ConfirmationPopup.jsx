"use client";

import { Button } from "@/components/ui/button";

export default function ConfirmationPopup({
  message = "Are you sure you want to proceed?",
  onConfirm,
  onCancel,
  buttonText = "Confirm",
}) {
  return (
    <div className="fixed h-full w-full inset-0 z-[100] bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center p-6 ">
          <div className="flex justify-center mb-4 ">
            <div className="w-35 h-35 rounded-full bg-red-600 flex items-center justify-center">
              <svg
                className="w-35 h-35 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="destructive"
              className=" px-6 w-full"
              onClick={onConfirm}
            >
              {buttonText}
            </Button>

            {onCancel && (
              <Button variant="hollow" className="w-full" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
