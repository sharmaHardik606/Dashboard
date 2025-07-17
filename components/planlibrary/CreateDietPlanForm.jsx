"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CreateDietPlanForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    calories: "",
    mealsPerDay: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Diet Plan Data:", formData);
    onClose();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-xl font-semibold">Create Diet Plan</h2>
        <button
          onClick={onClose}
          type="button"
          className="hover:text-gray-800 text-sm"
        >
          ✕
        </button>
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Plan Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Weight Loss Plan"
          className="w-full border px-3 py-[8px] rounded-md text-sm font-semibold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Calories / Day</label>
        <input
          type="number"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          placeholder="e.g., 1800"
          className="w-full border px-3 py-[8px] rounded-md text-sm font-semibold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Meals / Day</label>
        <input
          type="number"
          name="mealsPerDay"
          value={formData.mealsPerDay}
          onChange={handleChange}
          placeholder="e.g., 3"
          className="w-full border px-3 py-[8px] rounded-md text-sm font-semibold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Extra notes or guidelines"
          rows={3}
          className="w-full border px-3 py-[8px] rounded-md text-sm font-semibold resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <Button variant="hollow" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="mainblue" type="submit">
          Save Plan
        </Button>
      </div>
    </form>
  );
}
