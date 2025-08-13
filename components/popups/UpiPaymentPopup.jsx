import { XMarkIcon, ArrowTopRightOnSquareIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function UpiPaymentPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Complete your payment</h2>
        {/* Custom Icon */}
        <div className="flex items-center justify-center mb-6">
          {/* Illustration: Mobile with bank & card */}
          <div className="relative w-32 h-32 flex flex-col items-center">
            {/* Mobile */}
            <div className="bg-blue-200 w-20 h-28 rounded-xl border-4 border-blue-300 flex items-end justify-center">
              {/* Home button */}
              <div className="w-5 h-1 bg-blue-400 rounded-b"></div>
            </div>
            {/* Bank Structure */}
            <div className="absolute top-8 left-7 w-16 h-8 flex flex-col items-center">
              <div className="w-10 h-4 bg-green-600 rounded-t" />
              <div className="w-4 h-4 bg-green-600 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2" />
              <div className="w-16 h-2 bg-green-500" />
              <div className="flex space-x-2 mt-1">
                <div className="w-2 h-5 bg-green-400" />
                <div className="w-2 h-5 bg-green-400" />
                <div className="w-2 h-5 bg-green-400" />
              </div>
            </div>
            {/* Card */}
            <div className="absolute right-1 bottom-4 w-16 h-8 bg-gray-200 rounded shadow flex flex-col justify-between p-1">
              <div className="h-2 w-8 bg-blue-400 rounded" />
              <div className="flex items-center justify-between">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-8 h-1 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Steps */}
        <ol className="space-y-2 mb-3">
          <li className="flex items-start gap-3">
            <ArrowTopRightOnSquareIcon className="w-6 h-6 text-gray-800 mt-1" />
            <span>
              Go to UPI ID linked mobile app or Click on the notification from your UPI ID linked mobile app.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CreditCardIcon className="w-6 h-6 text-gray-800 mt-1" />
            <span>
              Check pending transactions.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1" />
            <span>
              Complete the payment by selecting the bank and entering UPI PIN.
            </span>
          </li>
        </ol>
        <div className="mt-2 text-xs text-gray-400">
          This page will automatically expire in 10 mins.
        </div>
      </div>
    </div>
  );
}
