"use client";

import { useState, useRef } from "react";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function GeneralSettings() {
  const [userImage, setUserImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleReplaceClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  const handleRemoveClick = () => {
    setUserImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const [gymInfo, setGymInfo] = useState({
    name: "Gold Gym",
    phone: "+91 9109090101",
    email: "gold@gmail.com",
    address: "ABC, California street, 11023",
    website: "www.goldgym.com",
    year: "2009",
    logo: null,
  });

  const [operatingHours, setOperatingHours] = useState([
    { day: "Monday", open: "6:00 AM", close: "10:30 PM" },
    { day: "Tuesday", open: "6:00 AM", close: "10:30 PM" },
    { day: "Wednesday", open: "6:00 AM", close: "10:30 PM" },
    { day: "Thursday", open: "6:00 AM", close: "10:30 PM" },
    { day: "Friday", open: "6:00 AM", close: "9:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "8:00 AM", close: "6:00 PM" },
  ]);

  const handleChange = (field, value) => {
    setGymInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold mb-2">Gym Information</h2>
        <p className="text-muted-foreground text-sm ">
          Manage basic information, localization, formatting, and operating
          hours for your gym.
        </p>
      </div>

      {/* Logo Upload */}
      <div className="flex flex-col items-start space-x-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Gym Logo</h3>
        </div>
        <div className="flex items-center gap-6 sm:justify-between justify-center">
          <div className="h-20 w-20  rounded-full bg-black flex items-center justify-center overflow-hidden">
            {userImage ? (
              <Image
                src={userImage}
                alt="User avatar"
                height={70}
                width={70}
                className="object-cover h-20 w-20"
                priority
              />
            ) : (
              <User className="text-white w-8 h-8" />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="default"
              className="font-semibold"
              onClick={handleReplaceClick}
            >
              Replace picture
            </Button>
            <Button
              variant="outline"
              className="font-semibold"
              onClick={handleRemoveClick}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      {/* Basic Info Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className=" font-semibold ">
          <Label className="mb-1 text-sm">Name</Label>
          <Input
            value={gymInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className=" font-semibold ">
          <Label className="mb-1 text-sm">Contact Number</Label>
          <Input
            value={gymInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className=" font-semibold ">
          <Label className="mb-1 text-sm">Contact Email</Label>
          <Input
            value={gymInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className=" font-semibold ">
          <Label className="mb-1 text-sm">Business Address</Label>
          <Textarea
            value={gymInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        <div className=" font-semibold ">
          <Label className="mb-1 text-sm">Website</Label>
          <Input
            value={gymInfo.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>
        <div className=" font-semibold ">
          <Label className="mb-1 text-sm">Year Established</Label>
          <Input
            value={gymInfo.year}
            onChange={(e) => handleChange("year", e.target.value)}
          />
        </div>
      </div>

      {/* Operating Hours Table */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Operating Hours</h3>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Day</th>
                <th className="text-left px-4 py-2 font-medium">Open</th>
                <th className="text-left px-4 py-2 font-medium">Close</th>
              </tr>
            </thead>
            <tbody>
              {operatingHours.map((dayInfo, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{dayInfo.day}</td>
                  <td className="px-4 py-2">{dayInfo.open}</td>
                  <td className="px-4 py-2">{dayInfo.close}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-blue-600 text-white">Save Changes</Button>
      </div>
    </div>
  );
}
