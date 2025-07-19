"use client";

import { useState } from "react";

export default function CommunicationSettings() {
  const [enableSMS, setEnableSMS] = useState(true);
  const [smsProvider, setSmsProvider] = useState("Custom API");
  const [smsApiKey, setSmsApiKey] = useState("ABC123");
  const [smsSecret, setSmsSecret] = useState("2121321039");
  const [smsSender, setSmsSender] = useState("+91 8978979785");

  const [enableWhatsApp, setEnableWhatsApp] = useState(true);
  const [waToken, setWaToken] = useState("875875");
  const [waPhoneID, setWaPhoneID] = useState("+91 8978979785");

  return (
    <div className="space-y-6 ">
      <h2 className="text-3xl font-semibold">Communication Settings</h2>

      {/* SMS Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Enable SMS Notifications</h3>
          <input
            type="checkbox"
            checked={enableSMS}
            onChange={() => setEnableSMS(!enableSMS)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* SMS Provider */}
          <div>
            <label className="block text-sm font-semibold mb-1">SMS Provider</label>
            <select
              value={smsProvider}
              onChange={(e) => setSmsProvider(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option>Custom API</option>
              <option>Twilio</option>
              <option>MSG91</option>
            </select>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-semibold mb-1">API Key / Account SID</label>
            <input
              type="text"
              value={smsApiKey}
              onChange={(e) => setSmsApiKey(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Auth Token */}
          <div>
            <label className="block text-sm font-semibold mb-1">Auth Token / API Secret</label>
            <input
              type="text"
              value={smsSecret}
              onChange={(e) => setSmsSecret(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Sender ID */}
          <div>
            <label className="block text-sm font-semibold mb-1">Sender ID / Phone Number</label>
            <input
              type="text"
              value={smsSender}
              onChange={(e) => setSmsSender(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* WhatsApp Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Enable WhatsApp Notifications</h3>
          <input
            type="checkbox"
            checked={enableWhatsApp}
            onChange={() => setEnableWhatsApp(!enableWhatsApp)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Access Token */}
          <div>
            <label className="block text-sm font-semibold mb-1">API Key / Access Token</label>
            <input
              type="text"
              value={waToken}
              onChange={(e) => setWaToken(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Phone Number ID */}
          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number ID</label>
            <input
              type="text"
              value={waPhoneID}
              onChange={(e) => setWaPhoneID(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
