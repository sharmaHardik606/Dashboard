"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  completePayment,
  clearModal,
  showUpiPopup,
  hideUpiPopup,
} from "@/redux/slices/paymentModalSlice";
import { markProfileComplete, fetchProfile } from "@/redux/slices/profileSlice";
import {
  upgradeSubscriptionPlanThunk,
  fetchCurrentSubscriptionPlan,
} from "@/redux/slices/subscriptionPlanSlice";
import SuccessPopup from "@/components/SuccessPopup";

export default function PaymentModal({
  selectedPlanId,
  selectedPlan,
  onPaymentComplete,
}) {
  // DEBUG: see what you get every render!
  console.log("PaymentModal: selectedPlanId:", selectedPlanId);
  console.log("PaymentModal: selectedPlan:", selectedPlan);

  const dispatch = useDispatch();
  const router = useRouter();
  const showPaymentModal = useSelector(
    (state) => state.paymentModal.showPaymentModal
  );
  const paymentCompleted = useSelector(
    (state) => state.paymentModal.paymentCompleted
  );
  const paymentMethod = useSelector(
    (state) => state.paymentModal.paymentMethod
  );
  const showUpiPopupState = useSelector(
    (state) => state.paymentModal.showUpiPopup
  );

  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    if (!showPaymentModal) return;
    const timeoutId = setTimeout(() => {
      setTimerExpired(true);
      dispatch(clearModal());
    }, 10 * 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, [showPaymentModal, dispatch]);

  useEffect(() => {
    if (showPaymentModal && paymentMethod === "card" && !paymentCompleted) {
      const timer = setTimeout(() => {
        dispatch(completePayment());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPaymentModal, paymentMethod, paymentCompleted, dispatch]);

  if (!showPaymentModal) return null;
  if (!paymentMethod) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="mb-4">Please select a payment method</p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => dispatch(clearModal())}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (timerExpired) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="mb-2 font-semibold text-red-600">
            Payment session expired.
          </p>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => setTimerExpired(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (paymentMethod === "upi" && !paymentCompleted && !showUpiPopupState) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full">
          <Image
            src="/payment.png"
            alt="Waiting for UPI payment"
            width={400}
            height={300}
            className="w-full h-auto"
          />
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded w-full"
            onClick={() => {
              dispatch(showUpiPopup());
              setTimeout(() => {
                dispatch(hideUpiPopup());
                dispatch(completePayment());
              }, 1000);
            }}
          >
            Simulate UPI Success
          </button>
        </div>
      </div>
    );
  }

  if (paymentCompleted || (paymentMethod === "upi" && showUpiPopupState)) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full flex items-center justify-center">
          <SuccessPopup
            message="Payment successful!"
            showButton={false}
            onClose={async () => {
              console.log(
                "PaymentModal onClose: selectedPlanId:",
                selectedPlanId,
                "selectedPlan:",
                selectedPlan
              );
              try {
                // prefer selectedPlan prop (which is lastPlanRef.current from parent)
                const planToSet = selectedPlan || selectedPlanId;
                if (planToSet) {
                  console.log("Upgrading to plan:", planToSet);
                  await dispatch(upgradeSubscriptionPlanThunk(planToSet));
                  await dispatch(fetchCurrentSubscriptionPlan());
                }
                await dispatch(markProfileComplete());
                await dispatch(fetchProfile());
                dispatch(clearModal());

                setTimeout(() => {
                  router.push("/dashboard");
                }, 200);
              } catch (error) {
                console.error("Payment completion error:", error);
              }
            }}
          />
        </div>
      </div>
    );
  }

  if (paymentMethod === "card" && !paymentCompleted) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full flex flex-col items-center">
          <Image
            src="/payment.png"
            alt="Processing..."
            width={400}
            height={300}
            className="w-full h-auto"
          />
          <p className="mt-4 text-blue-700 font-semibold">
            Processing payment...
          </p>
        </div>
      </div>
    );
  }
  return null;
}
