"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import StepOneBasicDetails from "./StepOneBasicDetails";
import StepTwoChoosePlan from "./StepTwoChoosePlan";
import PaymentModal from "./PaymentModal";
import { fetchProfile } from "@/redux/slices/profileSlice";
import { showPayment, setPaymentMethod } from "@/redux/slices/paymentModalSlice";

export default function CompleteProfileForm() {
  const dispatch = useDispatch();
  const isProfileComplete = useSelector(
    (state) => state.profile.isProfileComplete
  );
  const showPaymentModal = useSelector(
    (state) => state.paymentModal.showPaymentModal
  );
  const paymentCompleted = useSelector(
    (state) => state.paymentModal.paymentCompleted
  );

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hideForm, setHideForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  if (paymentCompleted || isProfileComplete) return null;

  return (
    <>
      {!hideForm && (
        <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-md overflow-y-auto">
          <div className="flex justify-center items-start min-h-screen py-10">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[90vw] max-w-[600px] shadow-lg relative">
              <div className="min-h-[400px]">
                {step === 1 && (
                  <StepOneBasicDetails
                    onNext={(data) => {
                      setFormData((prev) => ({ ...prev, ...data }));
                      setStep(2);
                    }}
                  />
                )}
                {step === 2 && (
                  <StepTwoChoosePlan
                    formData={formData}
                    onBack={() => setStep(1)}
                    mode="profile"
                    onPlanSelect={(planId, method) => {
                      setSelectedPlan(planId);
                      setHideForm(true);
                      dispatch(setPaymentMethod(method));
                      dispatch(showPayment());
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <PaymentModal
          selectedPlanId={selectedPlan}
          onPaymentComplete={() => {
            setHideForm(false);
            dispatch(fetchProfile());
          }}
        />
      )}
    </>
  );
}
