"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function LogPaymentForm({ onCancel }) {
  const [formData, setFormData] = useState({
    member: "",
    amount: "",
    date: null,
    method: "Cash",
    transactionId: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Payment:", formData);
    onCancel(); // Close modal after submit
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b-[1.5px] pb-3">
        <h2 className="text-xl font-semibold mb-2">Log Payment</h2>
        <button
          onClick={onCancel}
          className="hover:text-gray-800 text-sm hover:cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Member</label>
        <input
          type="text"
          name="member"
          placeholder="John Doe"
          value={formData.member}
          onChange={handleChange}
          className="w-full border px-3 py-1.5 rounded-md text-sm font-semibold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Amount Paid</label>
        <input
          type="text"
          name="amount"
          placeholder="₹ 2500"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border px-3 py-1.5 rounded-md text-sm font-semibold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Date of Payment
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal text-sm px-3 py-1.5"
            >
              {formData.date ? (
                format(formData.date, "dd/MM/yyyy")
              ) : (
                <span className="text-muted-foreground">Select a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Payment Method
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="method"
              value="Online"
              checked={formData.method === "Online"}
              onChange={handleChange}
              className="accent-blue-600"
            />
            Online
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="method"
              value="Cash"
              checked={formData.method === "Cash"}
              onChange={handleChange}
              className="accent-blue-600"
            />
            Cash
          </label>
        </div>
      </div>

      {formData.method === "Online" && (
        <div>
          <label className="text-xs font-semibold mb-1 block">
            Transaction ID
          </label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm font-semibold"
          />
        </div>
      )}

      <div>
        <label className="text-xs font-semibold mb-1 block">Notes</label>
        <textarea
          name="notes"
          rows={2}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Placeholder"
          className="w-full border px-3 py-1.5 rounded-md text-sm font-semibold resize-none"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="hollow" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="mainblue" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}
