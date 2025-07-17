"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateWorkoutPlanForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    difficulty: "",
    focus: "",
    duration: "",
    description: "",
  });

  const [days, setDays] = useState([{ workoutName: "", exercises: "" }]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDayChange = (index, field, value) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };

  const addDay = () => {
    setDays([...days, { workoutName: "", exercises: "" }]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Create New Workout Plan</h1>
        <div className="flex gap-2">
          <Button variant="hollow" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="mainblue">Save & Publish</Button>
        </div>
      </div>

      {/* Plan Overview */}
      <div>
        <h2 className="font-semibold mb-2">Plan Overview</h2>
        <div className="flex-col gap-4 rounded-lg border border-neutral-400 p-3 space-y-4">
          <div className="flex flex-col md:flex-row  gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Plan Name
              </label>
              <Input
                placeholder="Plan Name"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="text-sm font-semibold"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>
              <Input
                placeholder="Category (e.g. Strength Training)"
                value={formData.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
                className="text-sm font-semibold"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row  gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Difficulty
              </label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => handleFormChange("difficulty", value)}
              >
                <SelectTrigger className="w-full h-full text-sm font-semibold">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="text-sm font-semibold">
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">Focus</label>
              <Input
                placeholder="Focus"
                value={formData.focus}
                onChange={(e) => handleFormChange("focus", e.target.value)}
                className="text-sm font-semibold"
              />
            </div>
          </div>

          <div className="w-full sm:w-[49%]">
            <label className="block text-sm font-semibold mb-1">Duration</label>
            <Input
              placeholder="e.g. 4 Weeks"
              value={formData.duration}
              onChange={(e) => handleFormChange("duration", e.target.value)}
              className="text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              className="text-sm font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Plan Structure */}
      <div className="space-y-4">
        <h2 className="font-semibold mb-2">Plan Structure</h2>

        {days.map((day, index) => (
          <div
            key={index}
            className="flex-col gap-4 rounded-lg border border-neutral-400 p-3 space-y-4"
          >
            <h3 className="font-medium">Day {index + 1}</h3>
            <div className="flex-col gap-4 rounded-lg border border-neutral-400 p-3 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Workout Name
                </label>
                <Input
                  placeholder="e.g. Upper Body Strength"
                  value={day.workoutName}
                  onChange={(e) =>
                    handleDayChange(index, "workoutName", e.target.value)
                  }
                  className="text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Exercises
                </label>
                <Textarea
                  placeholder="e.g. Bench Press, Push Ups, Shoulder Press"
                  value={day.exercises}
                  onChange={(e) =>
                    handleDayChange(index, "exercises", e.target.value)
                  }
                  className="text-sm font-semibold"
                />
              </div>
            </div>
            <div className="flex">
              <Button variant="hollow" onClick={addDay} className="ml-auto">
                <Plus strokeWidth={3} />
                Add Another Day
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
