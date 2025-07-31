"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SuccessPopup from "@/components/SuccessPopup";

export function AddMembershipPlanForm({ onCancel, onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      planName: "",
      price: "",
      duration: "monthly",
      notes: "",
    },
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSubmit = (data) => {
    onSubmit?.(data);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onCancel(); // modal close after 2s
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, onCancel]);

  if (showSuccess) {
    return (
      <SuccessPopup
        message="Plan added successfully!"
        showButton={false}
        autoClose={2000}
        onClose={() => {}}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-lg font-semibold">Add New Plan</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-xl leading-none px-2 py-1 hover:text-gray-800 hover:cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <div className="space-y-4">
        {/* Plan Name */}
        <div>
          <label className="text-sm font-medium mb-1 block">Plan Name</label>
          <Input
            {...register("planName", { required: "Plan Name is required" })}
            placeholder="Plan Name"
          />
          {errors.planName && (
            <span className="text-xs text-red-500">{errors.planName.message}</span>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium mb-1 block">Price</label>
          <Input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price cannot be negative" },
            })}
            placeholder="₹"
          />
          {errors.price && (
            <span className="text-xs text-red-500">{errors.price.message}</span>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-medium mb-1 block">Duration</label>
          <Controller
            control={control}
            name="duration"
            render={({ field }) => (
              <RadioGroup
                className="flex gap-8"
                value={field.value}
                onValueChange={field.onChange}
              >
                {["monthly", "quarterly", "yearly"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <label htmlFor={option} className="text-sm font-medium capitalize">
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium mb-1 block">Notes</label>
          <Textarea {...register("notes")} placeholder="Optional" rows={3} />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="hollow" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="mainblue">
          Save
        </Button>
      </div>
    </form>
  );
}
