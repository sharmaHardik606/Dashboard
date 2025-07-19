"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Communication Settings</h2>

      {/* SMS Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Enable SMS Notifications</h3>
          <Switch checked={enableSMS} onCheckedChange={setEnableSMS} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* SMS Provider */}
          <div>
            <label className="block text-xs font-semibold mb-1">SMS Provider</label>
            <Select
              value={smsProvider}
              onValueChange={setSmsProvider}
              disabled={!enableSMS}
            >
              <SelectTrigger className="w-full font-semibold text-sm" disabled={!enableSMS}>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Custom API">Custom API</SelectItem>
                <SelectItem value="Twilio">Twilio</SelectItem>
                <SelectItem value="MSG91">MSG91</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-xs font-semibold mb-1">API Key / Account SID</label>
            <Input
              value={smsApiKey}
              onChange={(e) => setSmsApiKey(e.target.value)}
              disabled={!enableSMS}
              className={"font-semibold text-xs"}
            />
          </div>

          {/* Auth Token */}
          <div>
            <label className="block text-xs font-semibold mb-1">Auth Token / API Secret</label>
            <Input
              value={smsSecret}
              onChange={(e) => setSmsSecret(e.target.value)}
              disabled={!enableSMS}
              className={"font-semibold text-xs"}
            />
          </div>

          {/* Sender ID */}
          <div>
            <label className="block text-xs font-semibold mb-1">Sender ID / Phone Number</label>
            <Input
              value={smsSender}
              onChange={(e) => setSmsSender(e.target.value)}
              disabled={!enableSMS}
              className={"font-semibold text-xs"}
            />
          </div>
        </div>
      </div>

      {/* WhatsApp Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Enable WhatsApp Notifications</h3>
          <Switch checked={enableWhatsApp} onCheckedChange={setEnableWhatsApp} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Access Token */}
          <div>
            <label className="block text-xs font-semibold mb-1">API Key / Access Token</label>
            <Input
              value={waToken}
              onChange={(e) => setWaToken(e.target.value)}
              disabled={!enableWhatsApp}
              className={"font-semibold text-xs"}
            />
          </div>

          {/* Phone Number ID */}
          <div>
            <label className="block text-xs font-semibold mb-1">Phone Number ID</label>
            <Input
              value={waPhoneID}
              onChange={(e) => setWaPhoneID(e.target.value)}
              disabled={!enableWhatsApp}
              className={"font-semibold text-xs"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
