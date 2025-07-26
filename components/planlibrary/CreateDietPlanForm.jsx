"use client";

import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function CreateDietPlanForm({ onClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      planName: "",
      category: "",
      calories: "",
      description: "",
      days: [{ breakfast: "", lunch: "", dinner: "" }],
    },
  });

  const { fields, append, update } = useFieldArray({
    control,
    name: "days",
  });

  // Handles input changes within each day's fields
  const handleDayChange = (index, field, value) => {
    const day = { ...fields[index], [field]: value };
    update(index, day);
  };
  const countWords = (str) => {
    if (!str) return 0;
    // Split for real word count
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const onSubmit = (values) => {
    const dietPlanData = {
      planName: values.planName,
      category: values.category,
      dailyCalories: values.calories,
      description: values.description,
      days: values.days,
    };
    console.log("Diet Plan to submit:", dietPlanData);
    // When ready: await fetch(..., { body: JSON.stringify(dietPlanData) })
    onClose();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Create New Diet Plan</h1>
        <div className="flex gap-2">
          <Button variant="hollow" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="mainblue" type="submit">
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
                {...register("planName", { required: "Plan Name is required" })}
                placeholder="Plan Name"
                className="text-sm font-semibold"
              />
              {errors.planName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.planName.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>
              <Input
                {...register("category", { required: "Category is required" })}
                placeholder="Category (e.g. Muscle Gain)"
                className="text-sm font-semibold"
              />
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full sm:w-[49%]">
            <label className="block text-sm font-semibold mb-1">
              Daily Calories (Approx.)
            </label>
            <Input
              {...register("calories", { required: "Calories are required" })}
              placeholder="Daily Calories"
              className="text-sm font-semibold"
            />
            {errors.calories && (
              <p className="text-red-500 text-xs mt-1">
                {errors.calories.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <Textarea
              {...register("description", {
                required: "Description is required",
                validate: (value) => {
                  const words = countWords(value);
                  return (
                    (words >= 10 && words <= 150) ||
                    `Description should be between 10 and 150 words (currently ${words})`
                  );
                },
              })}
              placeholder="Description"
              className="text-sm font-semibold"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Plan Structure */}
      <div className="space-y-4">
        <h2 className="font-semibold mb-2">Plan Structure</h2>
        {fields.map((day, index) => (
          <div
            key={day.id}
            className="flex-col gap-4 rounded-lg border border-neutral-400 p-3 space-y-4"
          >
            <h3 className="font-medium">Day {index + 1}</h3>
            <div className="flex-col gap-4 rounded-lg border border-neutral-400 p-3 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Breakfast
                </label>
                <Controller
                  control={control}
                  name={`days.${index}.breakfast`}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Breakfast (e.g. Eggs with toast)"
                      className="text-sm font-semibold"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Lunch
                </label>
                <Controller
                  control={control}
                  name={`days.${index}.lunch`}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Lunch (e.g. Chicken Salad)"
                      className="text-sm font-semibold"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Dinner
                </label>
                <Controller
                  control={control}
                  name={`days.${index}.dinner`}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Dinner (e.g. Oats with milk)"
                      className="text-sm font-semibold"
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex">
              <Button
                variant="hollow"
                type="button"
                onClick={() => append({ breakfast: "", lunch: "", dinner: "" })}
                className="ml-auto"
              >
                <Plus strokeWidth={3} />
                Add Another Day
              </Button>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
