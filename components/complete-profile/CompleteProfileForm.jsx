"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import StepOneBasicDetails from "./StepOneBasicDetails";
import StepTwoChoosePlan from "./StepTwoChoosePlan";
import PaymentModal from "./PaymentModal";

export default function CompleteProfileForm() {
  const isProfileComplete = useSelector(
    (state) => state.profile.isProfileComplete
  );
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  if (isProfileComplete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[90vw] max-w-[600px] max-h-[94vh] overflow-y-auto shadow-lg relative">
        <div className="relative min-h-[400px]">
          <div
            className={`${step === 1 ? "block" : "hidden"} absolute inset-0`}
          >
            <StepOneBasicDetails
              onNext={(data) => {
                setFormData((prev) => ({ ...prev, ...data }));
                setStep(2);
              }}
            />
          </div>
          <div
            className={`${step === 2 ? "block" : "hidden"} absolute inset-0`}
          >
            <StepTwoChoosePlan
              formData={formData}
              onBack={() => setStep(1)}
            />
          </div>
        </div>
        <PaymentModal />
      </div>
    </div>
  );
}
