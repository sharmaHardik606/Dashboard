"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import WorkoutPlan from "@/components/planlibrary/WorkoutPlan";
import DietPlan from "@/components/planlibrary/DietPlan";

export default function PlanLibrary() {
  const [activeTab, setActiveTab] = useState("workout");

  return (
    <div className="p-3 space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Plan Library</h1>
        <div className="flex gap-2">
          {activeTab === "workout" ? (
            <Button variant="mainblue" size="lg">
              <Plus strokeWidth={3} />
              Create Workout Plan
            </Button>
          ) : (
            <Button variant="mainblue" size="lg">
              <Plus strokeWidth={3} />
              Create Diet Plan
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2 transition ">
        <Button
          variant={activeTab === "workout" ? "default" : "outline"}
          onClick={() => setActiveTab("workout")}
          className="text-sm hover:cursor-pointer"
        >
          Workout Plans
        </Button>

        <Button
          variant={activeTab === "diet" ? "default" : "outline"}
          onClick={() => setActiveTab("diet")}
          className="text-sm hover:cursor-pointer"
        >
          Diet Plans
        </Button>
      </div>

      {activeTab === "workout" ? <WorkoutPlan /> : <DietPlan />}
    </div>
  );
}
