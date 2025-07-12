"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FilterBar({
  label = "Search",
  searchValue,
  onSearchChange,
  primaryButton,
  secondaryButton,
}) {
  return (
    <div className="bg-white p-4 rounded-xl">
      <label htmlFor="search" className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Input
          id="search"
          type="text"
          placeholder="Search by name or ID"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-lg"
        />

        {/* Primary Button*/}
        {primaryButton && (
          <Button
            onClick={primaryButton.onClick}
            variant="mainblue"
            size="xl"
          >
            {primaryButton.label}
          </Button>
        )}

        {/* Optional Secondary Button */}
        {secondaryButton && (
          <Button
            onClick={secondaryButton.onClick}
            variant="mainblue"
            size="xl"
          >
            {secondaryButton.label}
          </Button>
        )}
      </div>
    </div>
  );
}

