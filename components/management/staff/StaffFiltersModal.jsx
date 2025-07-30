"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function StaffFiltersModal({
  open,
  onClose,
  defaultValues = {
    roles: ["trainer"],    // array of selected role keys
    status: ["active"],   // array of selected status keys
  },
  onApply, // callback to send selected filters
}) {
  // Filtering options
  const roleOptions = [
    { label: "Trainer", value: "trainer" },
    { label: "Administrator", value: "administrator" },
    { label: "Front Desk", value: "frontdesk" },
  ];

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  // State
  const [roles, setRoles] = useState(defaultValues.roles);
  const [status, setStatus] = useState(defaultValues.status);

  // Handlers
  const toggle = (arr, value) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleRoleChange = (value) => setRoles((r) => toggle(r, value));
  const handleStatusChange = (value) => setStatus((s) => toggle(s, value));

  const handleApply = () => {
    onApply?.({ roles, status });
    onClose();
  };

  const handleClear = () => {
    setRoles([]);
    setStatus([]);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b">Filters</DialogTitle>
        </DialogHeader>

        {/* Roles */}
        <fieldset>
          <legend className="font-medium mb-1 text-sm">Role</legend>
          <div className="flex gap-6 flex-wrap">
            {roleOptions.map((role) => (
              <label key={role.value} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={roles.includes(role.value)}
                  onCheckedChange={() => handleRoleChange(role.value)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                {role.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Status */}
        <fieldset className="">
          <legend className="font-medium mb-1 text-sm">Status</legend>
          <div className="flex gap-6 flex-wrap">
            {statusOptions.map((s) => (
              <label key={s.value} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={status.includes(s.value)}
                  onCheckedChange={() => handleStatusChange(s.value)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="hollow" onClick={handleClear}>
            Clear Filters
          </Button>
          <Button variant="mainblue" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
