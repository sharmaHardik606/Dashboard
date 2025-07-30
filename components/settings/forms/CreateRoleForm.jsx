"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SuccessPopup from "@/components/SuccessPopup";
import { useState } from "react";

const PERMISSIONS = ["Members", "Classes", "Workout", "Diet", "Staff"];

export default function CreateRoleForm({ onCancel }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      role: "",
      description: "",
      permissions: [],
    },
  });

  // sucesspopup state
  const [showSuccess, setShowSuccess] = useState(false);

  const permissions = watch("permissions");

  const onSubmit = (data) => {
    console.log("Submitted Role:", data);
    // send to API here when ready
    setShowSuccess(true);
    
  };

  if (showSuccess) {
    return (
      <SuccessPopup
        message="Role created successfully!"
        buttonText="Okay"
        showButton={false}
        onClose={() => {
          setShowSuccess(false);
          onCancel?.(); // closes the form/modal if passed from parent
        }}
      />
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-lg font-semibold">Create Role</h2>
        <button
          type="button"
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
          {...register("role", { required: "Role name is required" })}
          className="w-full border px-3 py-2 rounded-md text-sm"
          placeholder="e.g., Trainer, Manager"
        />
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>

      {/* Permissions */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Permissions</Label>
        <Controller
          name="permissions"
          control={control}
          rules={{
            validate: (value) =>
              value && value.length > 0
                ? true
                : "At least one permission must be selected",
          }}
          render={({ field: { value = [], onChange, ...fieldProps } }) => (
            <>
              <div className="flex gap-3">
                {PERMISSIONS.map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <Checkbox
                      id={permission}
                      checked={value.includes(permission)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onChange([...value, permission]);
                        } else {
                          onChange(value.filter((perm) => perm !== permission));
                        }
                      }}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      {...fieldProps}
                    />
                    <Label htmlFor={permission} className="text-sm">
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.permissions && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.permissions.message}
                </p>
              )}
            </>
          )}
        />

        {/* Description */}
        <div>
          <label className="text-sm font-medium block mb-1 mt-3">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full border px-3 py-2 rounded-md text-sm"
            placeholder="Brief role description"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex justify-end gap-3">
        <Button variant="hollow" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="mainblue" type="submit">
          Create Role
        </Button>
      </div>
    </form>
  );
}
