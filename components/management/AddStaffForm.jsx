"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AddStaffForm() {
  const [activeTab, setActiveTab] = useState("basic");

  // RHF setup
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      staffId: "",
      role: "",
      profilePhoto: null,
      documents: null,
      dateHired: null,
      accountNumber: "",
      ifsc: "",
      bankName: "",
      branch: "",
    }
  });

  // Watch to keep calendar button in sync
  const dateHired = watch("dateHired");

  const onSubmit = (data) => {
    // For file & multi-file uploads, you may want to process before sending to the backend
    // Convert FileList from documents to Array if present:
    let docs = data.documents;
    if (docs && docs.length > 0) {
      docs = Array.from(docs);
    }
    console.log("Form Data:", { ...data, documents: docs });
    // Place backend logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">Add New Staff Member</h2>
      <div className="border-t border-gray-200"></div>
      {/* Tabs */}
      <div className="mt-4 mb-5">
        <div className="flex items-center justify-center gap-4 ">
          <button
            type="button"
            className={cn(
              "py-2 text-sm font-semibold border-b-2",
              activeTab === "basic"
                ? "border-black text-black "
                : "border-transparent text-muted-foreground "
            )}
            onClick={() => setActiveTab("basic")}
          >
            Step 1 - Basic Details
          </button>
          <button
            type="button"
            className={cn(
              "py-2 text-sm font-semibold border-b-2",
              activeTab === "bank"
                ? "border-black text-black"
                : "border-transparent text-muted-foreground"
            )}
            onClick={() => setActiveTab("bank")}
          >
            Step 2 - Bank Details
          </button>
        </div>
      </div>

      {/* Step 1 */}
      {activeTab === "basic" && (
        <div className="space-y-4">
          {/* Name + Contact */}
          <div className="flex gap-4 ">
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Full Name
              </label>
              <Input
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Contact Number
              </label>
              <Input
                {...register("contact", { required: "Contact is required" })}
              />
              {errors.contact && <span className="text-red-500 text-xs">{errors.contact.message}</span>}
            </div>
          </div>

          {/* Email + Staff ID */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Email (Optional)
              </label>
              <Input
                {...register("email")}
              />
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Staff ID (Optional)
              </label>
              <Input
                {...register("staffId")}
              />
            </div>
          </div>

          {/* Profile Photo + Attach Documents */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Profile Photo
              </label>
              <Controller
                control={control}
                name="profilePhoto"
                render={({ field }) => (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={e => field.onChange(e.target.files[0])}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Attach Documents
              </label>
              <Controller
                control={control}
                name="documents"
                render={({ field }) => (
                  <Input
                    type="file"
                    multiple
                    onChange={e => field.onChange(e.target.files)}
                  />
                )}
              />
            </div>
          </div>

          {/* Role */}
          <div className="w-full">
            <label className="block text-xs font-semibold mb-1">Role</label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainer">Trainer</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
          </div>

          {/* Date Hired */}
          <div>
            <label className="block text-xs font-semibold mb-1">
              Date Hired
            </label>
            <Controller
              control={control}
              name="dateHired"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal text-xs",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.dateHired && <span className="text-red-500 text-xs">{errors.dateHired.message}</span>}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {activeTab === "bank" && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">
              Account Number
            </label>
            <Input
              placeholder="Enter Account Number"
              className=" text-xs font-semibold"
              {...register("accountNumber", { required: "Account number is required" })}
            />
            {errors.accountNumber && <span className="text-red-500 text-xs">{errors.accountNumber.message}</span>}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">
              IFSC Code
            </label>
            <Input
              placeholder="Enter IFSC Code"
              className=" text-xs font-semibold"
              {...register("ifsc", { required: "IFSC is required" })}
            />
            {errors.ifsc && <span className="text-red-500 text-xs">{errors.ifsc.message}</span>}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">
              Bank Name
            </label>
            <Input
              placeholder="Enter Bank Name"
              className=" text-xs font-semibold"
              {...register("bankName", { required: "Bank name is required" })}
            />
            {errors.bankName && <span className="text-red-500 text-xs">{errors.bankName.message}</span>}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Branch</label>
            <Input
              placeholder="Enter Branch"
              className=" text-xs font-semibold"
              {...register("branch", { required: "Branch is required" })}
            />
            {errors.branch && <span className="text-red-500 text-xs">{errors.branch.message}</span>}
          </div>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="mt-6 flex justify-end items-center gap-4">
        <Button type="button" variant="hollow" onClick={() => history.back()}>
          Cancel
        </Button>

        {activeTab === "basic" ? (
          <Button
            type="button"
            variant="mainblue"
            onClick={() => setActiveTab("bank")}
          >
            Next
          </Button>
        ) : (
          <Button type="submit" variant="mainblue">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}
