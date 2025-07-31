"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import StepOneBasicDetails from "./StepOneBasicDetails";
import StepTwoChoosePlan from "./StepTwoChoosePlan";
import PaymentModal from "./PaymentModal";
import { fetchProfile } from "@/redux/slices/profileSlice";

export default function CompleteProfileForm() {
  const dispatch = useDispatch();
  const isProfileComplete = useSelector(
    (state) => state.profile.isProfileComplete
  );
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (isProfileComplete) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-md overflow-y-auto">
      <div className="flex justify-center items-start min-h-screen py-10">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[90vw] max-w-[600px] shadow-lg relative">
          <div className="min-h-[400px]">
            <div className={step === 1 ? "block" : "hidden"}>
              <StepOneBasicDetails
                onNext={(data) => {
                  setFormData((prev) => ({ ...prev, ...data }));
                  setStep(2);
                }}
              />
            </div>
            <div className={step === 2 ? "block" : "hidden"}>
              <StepTwoChoosePlan
                formData={formData}
                onBack={() => setStep(1)}
                mode="profile"
              />
            </div>
          </div>
          <PaymentModal selectedPlanId={formData.plan} />
        </div>
      </div>
    </div>
  );
}
