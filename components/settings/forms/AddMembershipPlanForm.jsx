"use client";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AddMembershipPlanForm({ onCancel, onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      planName: "",
      price: "",
      duration: "monthly",
      notes: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add New Plan</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-xl leading-none px-2 py-1 hover:text-gray-800"
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
          {errors.planName && <span className="text-xs text-red-500">{errors.planName.message}</span>}
        </div>
        {/* Price */}
        <div>
          <label className="text-sm font-medium mb-1 block">Price</label>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold opacity-80">₹</span>
            <Input
              type="number"
              min={0}
              step={1}
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" }
              })}
              placeholder="0"
              className="w-full"
            />
          </div>
          {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
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
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <label
                    htmlFor="monthly"
                    className="text-sm font-medium"
                  >
                    Monthly
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quarterly" id="quarterly" />
                  <label
                    htmlFor="quarterly"
                    className="text-sm font-medium"
                  >
                    Quarterly
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <label
                    htmlFor="yearly"
                    className="text-sm font-medium"
                  >
                    Yearly
                  </label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
        {/* Notes */}
        <div>
          <label className="text-sm font-medium mb-1 block">Notes</label>
          <Textarea
            {...register("notes")}
            placeholder="Placeholder"
            rows={3}
          />
        </div>
      </div>
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
