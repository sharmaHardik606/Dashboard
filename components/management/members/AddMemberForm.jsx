"use client";

import { useForm, Controller } from "react-hook-form";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

export default function AddMemberForm({ onCancel }) {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById("profile-image");
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      profileImage: profileImage,
    };
    console.log("Submitted Data:", formData);
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
          Profile Picture (Optional)
        </label>
        <div className="flex items-start gap-3">
          {/* Preview */}
          <div className="flex-shrink-0">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-13 h-13 rounded-full object-cover border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="h-13 w-13 rounded-full bg-black flex items-center justify-center overflow-hidden">
                <User className="text-white w-6 h-6" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            {/* Large screen version → filename & buttons in one row */}
            {/* Small screen version → filename on top, buttons below */}
            <div className="flex flex-col gap-2 w-full">
              {/* Filename */}
              <div
                className="w-40 truncate whitespace-nowrap overflow-hidden text-xs font-semibold border px-2 py-1 rounded bg-gray-50"
                title={profileImage?.name || ""}
              >
                {profileImage?.name || "No file chosen"}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("profile-image").click()
                  }
                  className="flex-1 border px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Choose File
                </button>

                <input
                  id="camera-capture"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("camera-capture").click()
                  }
                  className="flex-1 border px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Take Photo
                </button>
              </div>

              {/* Help text */}
              <p className="text-xs text-gray-500">JPG, PNG, or GIF</p>
            </div>
          </div>
        </div>
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

      <div className="mt-1">
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
      <div className="mt-4 flex justify-end gap-3">
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
