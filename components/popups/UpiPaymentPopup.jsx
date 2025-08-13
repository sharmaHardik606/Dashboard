// components/UIPaymentModal.js
import {
  X,
  ArrowUpRight,
  CheckCircle,
  Wallet,
  CircleArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";

export default function UIPaymentModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full relative">
        {/* Header with title and close button */}
        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 m-0">
            Complete your payment
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lucide Icon or your Image */}
        <div className="flex items-center justify-center mb-6 gap-4">
          <Image
            src="/bank_upi.png"
            alt="Processing..."
            width={150}
            height={150}
            className=""
          />
        </div>

        {/* Steps */}
        <ol className="space-y-2 mb-4 text-xs font-medium">
          <li className="flex items-start gap-3 mb-2">
            <CircleArrowOutUpRight className="w-6 h-6 text-gray-800 " />
            <span>
              Go to UPI ID linked mobile app or Click on the notification from
              your UPI ID linked mobile app.
            </span>
          </li>
          <li className="flex items-start gap-3 mb-2">
            <Wallet className="w-4 h-4 text-gray-800 " />
            <span>Check pending transactions.</span>
          </li>
          <li className="flex items-start gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500 " />
            <span>
              Complete the payment by selecting the bank and entering UPI PIN.
            </span>
          </li>
        </ol>

        <div className="mt-5 text-xs text-gray-700">
          This page will automatically expire in 10 mins.
        </div>
      </div>
    </div>
  );
}
