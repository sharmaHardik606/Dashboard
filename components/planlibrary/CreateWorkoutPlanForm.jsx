"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

export default function WorkoutPlanForm({ onClose }) {
  const [days, setDays] = useState([{ workout: "", sets: "", reps: "", rest: "" }]);

  const addDay = () => {
    setDays([...days, { workout: "", sets: "", reps: "", rest: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...days];
    updated[index][field] = value;
    setDays(updated);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-3xl bg-white z-50 shadow-lg p-6 overflow-y-auto transition-transform">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-2xl font-semibold">Create New Workout Plan</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold block mb-1">Plan Name</label>
          <input
            type="text"
            placeholder="Upper Body Strength"
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Category</label>
          <select className="w-full border px-3 py-2 rounded-md text-sm">
            <option value="">Select Category</option>
            <option value="strength">Strength</option>
            <option value="endurance">Endurance</option>
            <option value="flexibility">Flexibility</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Description</label>
          <textarea
            placeholder="Workout description..."
            className="w-full border px-3 py-2 rounded-md text-sm"
            rows={3}
          />
        </div>

        <div className="border rounded-md p-4">
          <h3 className="text-md font-semibold mb-3">Plan Structure</h3>

          {days.map((day, index) => (
            <div key={index} className="mb-6 space-y-2">
              <h4 className="font-semibold">Day {index + 1}</h4>
              <input
                type="text"
                placeholder="Workout"
                value={day.workout}
                onChange={(e) => handleChange(index, "workout", e.target.value)}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Sets"
                value={day.sets}
                onChange={(e) => handleChange(index, "sets", e.target.value)}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Reps"
                value={day.reps}
                onChange={(e) => handleChange(index, "reps", e.target.value)}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Rest (in seconds)"
                value={day.rest}
                onChange={(e) => handleChange(index, "rest", e.target.value)}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
            </div>
          ))}

          <Button variant="ghost" onClick={addDay}>
            + Add Another Day
          </Button>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="hollow" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="mainblue">Save & Publish</Button>
        </div>
      </div>
    </div>
  );
}
