"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function CreateDietPlanForm({ onClose }) {
  const [planName, setPlanName] = useState("");
  const [category, setCategory] = useState("");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState([{ breakfast: "", lunch: "", dinner: "" }]);

  const handleDayChange = (index, field, value) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };

  const addDay = () => {
    setDays([...days, { breakfast: "", lunch: "", dinner: "" }]);
  };

  const handleSubmit = () => {
    // validation
    if (!planName || !category || !calories || !description) {
      alert("Please fill in all required fields");
      return;
    }

    const dietPlanData = {
      planName,
      category,
      dailyCalories: calories,
      description,
      days,
    };

    console.log("Diet Plan to submit:", dietPlanData);

    // TODP: send DietPlanData to API when backend is ready
    // await fetch("/api/diet-plans", { method: "POST", body: JSON.stringify(dietPlanData) })

    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Create New Diet Plan</h1>
        <div className="flex gap-2">
          <Button variant="hollow" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="mainblue" onClick={handleSubmit}>
            Save & Publish
          </Button>
        </div>
      </div>

      {/* Plan Overview */}
      <div>
        <h2 className="font-semibold mb-2">Plan Overview</h2>
        <div className="flex-col gap-4 rounded-lg border border-neutral-400 p-3 space-y-4">
          <div className="flex flex-col sm:flex-row  gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Plan Name
              </label>
              <Input
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="Plan Name"
                className="text-sm font-semibold"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category (e.g. Muscle Gain)"
                className="text-sm font-semibold"
              />
            </div>
          </div>
          <div className="w-full sm:w-[49%]">
            <label className="block text-sm font-semibold mb-1">
              Daily Calories (Approx.)
            </label>
            <Input
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Daily Calories"
              className="text-sm font-semibold"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
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
                  Breakfast
                </label>
                <Textarea
                  value={day.breakfast}
                  onChange={(e) =>
                    handleDayChange(index, "breakfast", e.target.value)
                  }
                  placeholder="Breakfast (e.g. Eggs with toast)"
                  className="text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Lunch
                </label>
                <Textarea
                  value={day.lunch}
                  onChange={(e) =>
                    handleDayChange(index, "lunch", e.target.value)
                  }
                  placeholder="Lunch (e.g. Chicken Salad)"
                  className="text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Dinner
                </label>
                <Textarea
                  value={day.dinner}
                  onChange={(e) =>
                    handleDayChange(index, "dinner", e.target.value)
                  }
                  placeholder="Dinner (e.g. Oats with milk)"
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
