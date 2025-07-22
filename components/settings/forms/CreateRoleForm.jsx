"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const PERMISSIONS = ["Members", "Classes", "Workout", "Diet", "Staff"];

export default function CreateRoleForm({ onCancel }) {
  const [formData, setFormData] = useState({
    role: "",
    description: "",
    permissions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => {
      const alreadySelected = prev.permissions.includes(permission);
      const updatedPermissions = alreadySelected
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions: updatedPermissions };
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Role:", formData);
    // send to API here when ready
    onCancel();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-lg font-semibold">Create Role</h2>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-black text-sm"
        >
          ✕
        </button>
      </div>

      {/* Role Name */}
      <div>
        <label className="text-sm font-medium block mb-1">Role Name</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md text-sm"
          placeholder="e.g., Trainer, Manager"
        />
      </div>

      {/* Permissions */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Permissions</Label>
        <div className="grid grid-cols-2 gap-3">
          {PERMISSIONS.map((permission) => (
            <div key={permission} className="flex items-center gap-2">
              <Checkbox
                id={permission}
                checked={formData.permissions.includes(permission)}
                onCheckedChange={() => handlePermissionToggle(permission)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor={permission} className="text-sm">
                {permission}
              </Label>
            </div>
          ))}
        </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border px-3 py-2 rounded-md text-sm"
          placeholder="Brief role description"
        />
      </div>

      
      </div>

      {/* Actions */}
      <div className="pt-4 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
