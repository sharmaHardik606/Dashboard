"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AddMemberForm({ onCancel }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      plan: "",
      trainer: "",
      payment: "Cash",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    onCancel(); // Close modal after submit
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between border-b-[1.5px] pb-3">
        <h2 className="text-xl font-semibold mb-2">Add New Member</h2>
        <button
          type="button"
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
          placeholder="Name"
          className="w-full border px-3 py-2 rounded-md text-xs font-semibold"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Contact Number
        </label>
        <input
          type="text"
          placeholder="Contact Number"
          className="w-full border px-3 py-2 rounded-md text-xs font-semibold"
          {...register("contact", { required: "Contact number is required" })}
        />
        {errors.contact && (
          <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Email (Optional)
        </label>
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-md text-xs font-semibold"
          {...register("email")}
        />
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Membership Plan
        </label>
        <Controller
          control={control}
          name="plan"
          rules={{ required: "Plan is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
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
          )}
        />
        {errors.plan && (
          <p className="text-red-500 text-xs mt-1">{errors.plan.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Personal Trainer
        </label>
        <Controller
          control={control}
          name="trainer"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full text-sm font-semibold">
                <SelectValue placeholder="Personal Trainer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="trainer-a">Trainer A</SelectItem>
                <SelectItem value="trainer-b">Trainer B</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {/* No error for trainer, as not required */}
      </div>

      <div className="mt-2">
        <label className="text-xs font-medium mb-1 block">Payment Mode</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              value="Online"
              className="accent-blue-600"
              {...register("payment")}
            />
            Online
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              value="Cash"
              className="accent-blue-600"
              {...register("payment")}
            />
            Cash
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="hollow" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="mainblue">
          Add Member
        </Button>
      </div>
    </form>
  );
}
