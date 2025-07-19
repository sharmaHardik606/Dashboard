"use client";

import { useState } from "react";
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
  const [dateHired, setDateHired] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    staffId: "",
    role: "",
    profilePhoto: null,
    documents: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData, "Date Hired:", dateHired);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <h2 className="text-lg font-semibold  mb-4">Add New Staff Member</h2>
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
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Contact Number
              </label>
              <Input
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
              />
            </div>
          </div>

          {/* Email + Staff ID */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Email (Optional)
              </label>
              <Input
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Staff ID (Optional)
              </label>
              <Input
                value={formData.staffId}
                onChange={(e) => handleInputChange("staffId", e.target.value)}
              />
            </div>
          </div>

          {/* Profile Photo + Attach Documents */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Profile Photo
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange("profilePhoto", e.target.files[0])
                }
              />
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1">
                Attach Documents
              </label>
              <Input
                type="file"
                multiple
                onChange={(e) => handleFileChange("documents", e.target.files)}
              />
            </div>
          </div>

          {/* Role */}
          <div className="w-full">
            <label className="block text-xs font-semibold mb-1">Role</label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trainer">Trainer</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Hired */}
          <div>
            <label className="block text-xs font-semibold mb-1">
              Date Hired
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal text-xs",
                    !dateHired && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateHired ? format(dateHired, "dd/MM/yyyy") : "DD/MM/YYYY"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateHired}
                  onSelect={setDateHired}
                />
              </PopoverContent>
            </Popover>
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
            <Input placeholder="Enter Account Number" className=" text-xs font-semibold"/>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">
              IFSC Code
            </label>
            <Input placeholder="Enter IFSC Code" className=" text-xs font-semibold"/>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">
              Bank Name
            </label>
            <Input placeholder="Enter Bank Name" className=" text-xs font-semibold"/>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Branch</label>
            <Input placeholder="Enter Branch" className=" text-xs font-semibold"/>
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
