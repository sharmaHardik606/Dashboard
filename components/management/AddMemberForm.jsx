"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AddMemberForm({ onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    plan: "",
    trainer: "",
    payment: "Cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    onCancel(); // Close modal after submit
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b-[1.5px] pb-3">
        <h2 className="text-xl font-semibold mb-2">Add New Member</h2>
        <button
          onClick={onCancel}
          className="hover:text-gray-800 text-sm hover:cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md text-xs font-semibold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Contact Number
        </label>
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md text-xs font-semibold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Email (Optional)
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md text-xs font-semibold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Membership Plan
        </label>
        <Select
          value={formData.plan}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, plan: value }))
          }
        >
          <SelectTrigger className="w-full text-sm font-semibold">
            <SelectValue placeholder="Select Membership Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gold">Gold Plan</SelectItem>
            <SelectItem value="platinum">Platinum Plan</SelectItem>
            <SelectItem value="student">Student Plan </SelectItem>
            <SelectItem value="silver">Silver Plan </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Personal Trainer
        </label>
        <Select
          value={formData.trainer}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, trainer: value }))
          }
        >
          <SelectTrigger className="w-full text-sm font-semibold">
            <SelectValue placeholder="Personal Trainer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="trainer-a">Trainer A</SelectItem>
            <SelectItem value="trainer-b">Trainer B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
        <label className="text-xs font-medium mb-1 block">Payment Mode</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={formData.payment === "Online"}
              onChange={handleChange}
              className="accent-blue-600" 
            />
            Online
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="payment"
              value="Cash"
              checked={formData.payment === "Cash"}
              onChange={handleChange}
              className="accent-blue-600" 
            />
            Cash
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="hollow" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="mainblue" onClick={handleSubmit}>
          Add Member
        </Button>
      </div>
    </div>
  );
}
