"use client";

import { useState } from "react";
import Toggle from "@/components/sharedcomponents/Toggle";

export default function AttendanceSettings() {
  const [manualCheckIn, setManualCheckIn] = useState(true);
  const [requireNote, setRequireNote] = useState(true);
  const [qrCheckIn, setQrCheckIn] = useState(true);
  const [generateQr, setGenerateQr] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [checkoutTracking, setCheckoutTracking] = useState(false);
  const [manualCheckout, setManualCheckout] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Attendance Settings</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Enabled Check-in Methods</h3>

        {/* Manual Check-in */}
        <div className="flex justify-between items-center border-2 rounded-md py-2 px-3 text-sm font-semibold bg-[#F7F7F7]">
          <span className="font-semibold">Manual Check-in by Staff</span>
          <Toggle enabled={manualCheckIn} setEnabled={setManualCheckIn} />
        </div>

        {/* Require Note for Manual */}
        <div className="pl-1">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={requireNote}
              onChange={() => setRequireNote(!requireNote)}
              className="accent-blue-600 w-5 h-5 " 
            />
            <span className=" font-semibold">
              Require note for manual check-ins
            </span>
          </label>
        </div>

        {/* QR Check-in */}
        <div className="flex justify-between items-center border-2 rounded-md py-2 px-3 text-sm font-semibold bg-[#F7F7F7]">
          <span>QR Code Scanning</span>
          <Toggle enabled={qrCheckIn} setEnabled={setQrCheckIn} />
        </div>

        {/* Generate QR */}
        <div className="pl-1">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="accent-blue-600 w-5 h-5" 
              checked={generateQr}
              onChange={() => setGenerateQr(!generateQr)}
            />
            <span className="font-semibold">Generate QR codes in member profiles</span>
          </label>
        </div>

        {/* Biometric */}
        <div className="flex justify-between items-center border-2 rounded-md py-2 px-3 text-sm font-semibold bg-[#F7F7F7]">
          <span className="font-semibold">Biometric Integration</span>
          <Toggle enabled={biometric} setEnabled={setBiometric} />
        </div>
      </div>

      {/* Checkout */}
      <div className="space-y-4 ">
        <h3 className="text-lg font-semibold">Check-out Settings (Optional)</h3>

        <div className="flex justify-between items-center border-2 rounded-md py-2 px-3 text-sm font-semibold bg-[#F7F7F7]">
          <span className="font-semibold">Enable Check-out Tracking</span>
          <Toggle enabled={checkoutTracking} setEnabled={setCheckoutTracking} />
        </div>

        <div className="pl-1">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="accent-blue-600 w-5 h-5" 
              checked={manualCheckout}
              onChange={() => setManualCheckout(!manualCheckout)}
              disabled={!checkoutTracking}
            />
            <span className={`font-semibold ${!checkoutTracking ? "text-gray-400" : ""}`}>
              Allow manual check-out by staff
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
