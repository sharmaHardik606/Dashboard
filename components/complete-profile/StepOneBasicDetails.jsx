"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function StepOneBasicDetails({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Step 1 Data:", data);
    onNext(data); 

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <h2 className="text-lg font-semibold">Complete Profile</h2>
     <div className="border-b"></div>
      <h2 className="text-lg font-semibold">Step 1 - Basic Details</h2>
       

      {/* Legal Business Name */}
      <div className="space-y-1">
        <Label className={"mb-2"}>Legal Business Name</Label>
        <Input
          {...register("businessName", { required: "Business name is required" })}
          placeholder="Gold Gym"
        />
        {errors.businessName && (
          <p className="text-sm text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      {/* Contact Number */}
      <div className="space-y-1">
        <Label className={"mb-2"}>Contact Number</Label>
        <Input
          type="tel"
          {...register("contactNumber", {
            required: "Contact number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Enter a valid phone number",
            },
          })}
          placeholder="+91 9109091011"
        />
        {errors.contactNumber && (
          <p className="text-sm text-red-500">{errors.contactNumber.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label className={"mb-2"}>Email Address</Label>
        <Input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="gold@gmail.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Website */}
      <div className="space-y-1">
        <Label className={"mb-2"}>Website</Label>
        <Input
          type="text"
          {...register("website")}
          placeholder="www.goldgym.com"
        />
      </div>

      {/* Upload Business Documents */}
      <div className="space-y-1">
        <Label className={"mb-2"}>Business Registration Documents</Label>
        <Input
          type="file"
          {...register("documents", { required: "Document is required" })}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        {errors.documents && (
          <p className="text-sm text-red-500">{errors.documents.message}</p>
        )}
      </div>

      {/* Year Established */}
      <div className="space-y-1">
        <Label className={"mb-2"}>Year Established</Label>
        <Input
          type="number"
          {...register("year", {
            required: "Year is required",
            min: {
              value: 1900,
              message: "Enter a valid year",
            },
          })}
          placeholder="2009"
        />
        {errors.year && (
          <p className="text-sm text-red-500">{errors.year.message}</p>
        )}
      </div>

      {/* Business Address */}
      <div className="space-y-1">
        <Label className={"mb-2"}>Business Address</Label>
        <Input
          type="text"
          {...register("address", { required: "Address is required" })}
          placeholder="ABC, California Street, 11023"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" disabled>
          Cancel
        </Button>
        <Button type="submit" variant="mainblue">
          Next
        </Button>
      </div>
    </form>
  );
}
