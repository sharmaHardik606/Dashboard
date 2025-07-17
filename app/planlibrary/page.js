"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkoutPlan from "@/components/planlibrary/WorkoutPlan";
import DietPlan from "@/components/planlibrary/DietPlan";
import SlideOverPanel from "@/components/sharedcomponents/SlideOverPanel";
import WorkoutPlanForm from "@/components/planlibrary/CreateWorkoutPlanForm";
import DietPlanForm from "@/components/planlibrary/CreateDietPlanForm";

export default function PlanLibrary() {
  const [activeTab, setActiveTab] = useState("workout");
  const [showPanel, setShowPanel] = useState(false);

  const handleOpenPanel = () => setShowPanel(true);
  const handleClosePanel = () => setShowPanel(false);

  return (
    <div className="p-3 space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Plan Library</h1>
        <div className="flex gap-2">
          <Button variant="mainblue" size="lg" onClick={handleOpenPanel}>
            <Plus strokeWidth={3} />
            {activeTab === "workout"
              ? "Create Workout Plan"
              : "Create Diet Plan"}
          </Button>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "workout" ? "default" : "outline"}
          onClick={() => setActiveTab("workout")}
          className="text-sm"
        >
          Workout Plans
        </Button>
        <Button
          variant={activeTab === "diet" ? "default" : "outline"}
          onClick={() => setActiveTab("diet")}
          className="text-sm"
        >
          Diet Plans
        </Button>
      </div>

      {/* Plan Content */}
      {activeTab === "workout" ? <WorkoutPlan /> : <DietPlan />}

      {/* Slide Over Panel */}
      <SlideOverPanel
        isOpen={showPanel}
        onClose={handleClosePanel}
        title={
          activeTab === "workout"
            ? "Create New Workout Plan"
            : "Create New Diet Plan"
        }
      >
        {activeTab === "workout" ? (
          <WorkoutPlanForm onClose={handleClosePanel} />
        ) : (
          <DietPlanForm onClose={handleClosePanel} />
        )}
      </SlideOverPanel>
    </div>
  );
}
