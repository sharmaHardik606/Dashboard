"use client";

import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function LogPaymentForm({ onCancel }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      member: "",
      amount: "",
      date: null,
      method: "Cash",
      transactionId: "",
      notes: "",
    }
  });

  const method = watch("method");

  const onSubmit = (data) => {
    console.log("Submitted Payment:", data);
    onCancel(); // Close modal after submit
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between border-b-[1.5px] pb-3">
        <h2 className="text-xl font-semibold mb-2">Log Payment</h2>
        <button
          type="button"
          onClick={onCancel}
          className="hover:text-gray-800 text-sm hover:cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Member</label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full border px-3 py-1.5 rounded-md text-sm font-semibold"
          {...register("member", { required: "Member is required" })}
        />
        {errors.member && (
          <p className="text-red-500 text-xs mt-1">{errors.member.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">Amount Paid</label>
        <input
          type="text"
          placeholder="₹ 2500"
          className="w-full border px-3 py-1.5 rounded-md text-sm font-semibold"
          {...register("amount", { required: "Amount is required" })}
        />
        {errors.amount && (
          <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Date of Payment
        </label>
        <Controller
          control={control}
          name="date"
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal text-sm px-3 py-1.5"
                >
                  {field.value ? (
                    format(field.value, "dd/MM/yyyy")
                  ) : (
                    <span className="text-muted-foreground">Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold mb-1 block">
          Payment Method
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              value="Online"
              {...register("method")}
              className="accent-blue-600"
            />
            Online
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              value="Cash"
              {...register("method")}
              className="accent-blue-600"
            />
            Cash
          </label>
        </div>
      </div>

      {method === "Online" && (
        <div>
          <label className="text-xs font-semibold mb-1 block">
            Transaction ID
          </label>
          <input
            type="text"
            {...register("transactionId", {
              required: "Transaction ID is required for Online payment"
            })}
            className="w-full border px-3 py-2 rounded-md text-sm font-semibold"
          />
          {errors.transactionId && (
            <p className="text-red-500 text-xs mt-1">{errors.transactionId.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="text-xs font-semibold mb-1 block">Notes</label>
        <textarea
          rows={2}
          placeholder="Placeholder"
          className="w-full border px-3 py-1.5 rounded-md text-sm font-semibold resize-none"
          {...register("notes")}
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
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
