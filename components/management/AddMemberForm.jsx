"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-xl font-semibold mb-2">Add New Member</h2>
        <button
        onClick={onCancel}
        className=" text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={formData.contact}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      <input
        type="email"
        name="email"
        placeholder="Email (Optional)"
        value={formData.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      <select
        name="plan"
        value={formData.plan}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-md"
      >
        <option value="">Select Membership Plan</option>
        <option value="gold">Gold Plan - Quarterly</option>
        <option value="silver">Silver Plan - Monthly</option>
      </select>

      <select
        name="trainer"
        value={formData.trainer}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-md"
      >
        <option value="">Personal Trainer</option>
        <option value="none">None</option>
        <option value="trainer-a">Trainer A</option>
        <option value="trainer-b">Trainer B</option>
      </select>

      <div className="mt-2">
        <label className="block text-sm font-medium mb-1">Payment Mode:</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={formData.payment === "Online"}
              onChange={handleChange}
            />
            Online
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Cash"
              checked={formData.payment === "Cash"}
              onChange={handleChange}
            />
            Cash
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="mainblue" onClick={handleSubmit}>
          Add Member
        </Button>
      </div>
    </div>
  );
}

