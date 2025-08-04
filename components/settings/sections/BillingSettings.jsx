"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import StepTwoChoosePlan from "@/components/complete-profile/StepTwoChoosePlan";
import PaymentModal from "@/components/complete-profile/PaymentModal";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import {
  fetchCurrentSubscriptionPlan,
  upgradeSubscriptionPlanThunk,
  cancelSubscriptionPlanThunk,
  fetchSubscriptionPlans,
} from "@/redux/slices/subscriptionPlanSlice";

export default function BillingSettings() {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.subscriptionPlans.currentSubscriptionPlan);
  const upgrading = useSelector((state) => state.subscriptionPlans.upgrading);
  const cancelling = useSelector((state) => state.subscriptionPlans.cancelling);
  const allPlans = useSelector((state) => state.subscriptionPlans.subscriptionPlans);

  const [showUpgradeForm, setShowUpgradeForm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentSubscriptionPlan());
    dispatch(fetchSubscriptionPlans());
  }, [dispatch]);

  // Plan upgrade logic (calls payment step)
  const handleUpgrade = async (newPlanId) => {
    await dispatch(upgradeSubscriptionPlanThunk(newPlanId));
    setShowUpgradeForm(false);
  };

  const handleCancel = async () => {
    await dispatch(cancelSubscriptionPlanThunk());
    setShowCancelConfirm(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold mb-2">
          Billings & Payment Settings
        </h2>
      </div>

      {/* Payment Method */}
      <section className=" space-y-3">
        <div className="text-lg font-semibold mb-3">Payment Method</div>
        <div className="flex items-center justify-between bg-blue-50 rounded-lg py-4 px-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full border">
              <img src="/razorpay.png" alt="Razorpay" className="w-8 h-6" />
            </span>
            <div className="font-medium text-base">Razorpay</div>
          </div>
          <Button variant="outline" className="font-semibold px-6 py-2">
            Connect
          </Button>
        </div>
        <div className="text-xs text-gray-800 mt-1 ml-1">
          Connect Razorpay to accept payments from your members
        </div>
      </section>

      {/* Subscription Plan Section */}
      <section>
        <div className="mb-4">
          <span className="block text-lg font-semibold mb-1">
            Subscription Plan
          </span>
        </div>

        {!showUpgradeForm ? (
          <div className="flex flex-col sm:flex-row sm:items-start justify-between rounded-xl border-[1.4px] bg-white p-6">
            <div>
              <div className="text-base font-semibold">
                {plan ? plan.name : "No Plan"}
              </div>
              <div className="text-3xl font-bold">
                {plan ? plan.price : "-"}
                <span className="text-base font-medium text-gray-700 ml-1">
                  {plan ? `/${plan.duration}` : ""}
                </span>
              </div>
              <ul className="mt-2 mb-1 space-y-1 text-sm text-gray-700 list-disc pl-5">
                {plan && plan.features && plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <Button
                variant="hollow"
                className="font-medium"
                onClick={() => setShowCancelConfirm(true)}
                disabled={!plan || cancelling}
              >
                {cancelling ? "Cancelling..." : "Cancel Subscription"}
              </Button>
              <Button
                variant="mainblue"
                className="text-sm font-semibold"
                onClick={() => setShowUpgradeForm(true)}
                disabled={upgrading}
              >
                {upgrading ? "Upgrading..." : "Upgrade"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="border p-4 rounded-xl bg-white">
            <StepTwoChoosePlan
              mode="billing"
              plans={allPlans}
              onPlanSelect={handleUpgrade}
              onBack={() => setShowUpgradeForm(false)}
            />
          </div>
        )}
      </section>

      {/* Payment modal for upgrades/cancellations */}
      <PaymentModal />

      {/* Cancellation confirmation */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
            <ConfirmationPopup
              message="Are you sure you want to cancel your subscription?"
              buttonText="Yes, Cancel Subscription"
              onConfirm={handleCancel}
              onCancel={() => setShowCancelConfirm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
