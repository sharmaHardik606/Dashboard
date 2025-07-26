"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      difficulty: "",
      focus: "",
      duration: "",
      description: "",
      days: [{ workoutName: "", exercises: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "days",
  });

  // Description Word Count Validation
  const countWords = (str) => {
    if (!str) return 0;
    // Split for real word count
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const onSubmit = (data) => {
    // Optionally do extra final validation here
    // console.log("Workout Plan Data:", data);
    onClose?.();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Create New Workout Plan</h1>
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
          <div className="flex flex-col md:flex-row  gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">Plan Name</label>
              <Input
                {...register("name", { required: "Plan Name is required" })}
                placeholder="Plan Name"
                className="text-sm font-semibold"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">Category</label>
              <Input
                {...register("category", { required: "Category is required" })}
                placeholder="Category (e.g. Strength Training)"
                className="text-sm font-semibold"
              />
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row  gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">Difficulty</label>
              <Controller
                name="difficulty"
                control={control}
                rules={{ required: "Difficulty is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
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
                )}
              />
              {errors.difficulty && (
                <p className="text-red-500 text-xs mt-1">{errors.difficulty.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold mb-1">Focus</label>
              <Input
                {...register("focus", { required: "Focus is required" })}
                placeholder="Focus"
                className="text-sm font-semibold"
              />
              {errors.focus && (
                <p className="text-red-500 text-xs mt-1">{errors.focus.message}</p>
              )}
            </div>
          </div>

          <div className="w-full sm:w-[49%]">
            <label className="block text-sm font-semibold mb-1">Duration</label>
            <Input
              {...register("duration", { required: "Duration is required" })}
              placeholder="e.g. 4 Weeks"
              className="text-sm font-semibold"
            />
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
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
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
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
                  Workout Name
                </label>
                <Controller
                  control={control}
                  name={`days.${index}.workoutName`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="e.g. Upper Body Strength"
                      className="text-sm font-semibold"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Exercises
                </label>
                <Controller
                  control={control}
                  name={`days.${index}.exercises`}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="e.g. Bench Press, Push Ups, Shoulder Press"
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
                onClick={() =>
                  append({ workoutName: "", exercises: "" })
                }
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
