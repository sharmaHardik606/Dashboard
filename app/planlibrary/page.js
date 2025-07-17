"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkoutPlan from "@/components/planlibrary/WorkoutPlan";
import DietPlan from "@/components/planlibrary/DietPlan";
import WorkoutPlanForm from "@/components/planlibrary/CreateWorkoutPlanForm";
import DietPlanForm from "@/components/planlibrary/CreateDietPlanForm";

export default function PlanLibrary() {
  const [activeTab, setActiveTab] = useState("workout");
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="p-3 sm:p-6">
      {showForm ? (
        activeTab === "workout" ? (
          <WorkoutPlanForm onClose={handleCloseForm} />
        ) : (
          <DietPlanForm onClose={handleCloseForm} />
        )
      ) : (
        <>
          <div className="flex flex-col justify-between gap-4 sm:flex-row items-start sm:items-center">
            <h1 className="text-3xl font-semibold">Plan Library</h1>
            <Button variant="mainblue" size="lg" onClick={handleCreateClick}>
              <Plus strokeWidth={3} />
              {activeTab === "workout" ? "Create Workout Plan" : "Create Diet Plan"}
            </Button>
          </div>

          <div className="flex gap-2 mt-6">
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

          <div className="mt-6">
            {activeTab === "workout" ? <WorkoutPlan /> : <DietPlan />}
          </div>
        </>
      )}
    </div>
  );
}
