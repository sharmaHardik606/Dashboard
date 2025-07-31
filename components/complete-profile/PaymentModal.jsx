"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  hidePayment,
  completePayment,
  clearModal,
  showUpiPopup,
  hideUpiPopup,
  setPaymentMethod,
} from "@/redux/slices/paymentModalSlice";
import { markProfileComplete } from "@/redux/slices/profileSlice";
import { upgradeSubscriptionPlanThunk } from "@/redux/slices/subscriptionPlanSlice";
import SuccessPopup from "@/components/SuccessPopup";

export default function PaymentModal({ selectedPlanId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const showPaymentModal = useSelector((state) => state.paymentModal.showPaymentModal);
  const paymentCompleted = useSelector((state) => state.paymentModal.paymentCompleted);
  const paymentMethod = useSelector((state) => state.paymentModal.paymentMethod);
  const showUpiPopupState = useSelector((state) => state.paymentModal.showUpiPopup);

  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    if (!showPaymentModal) return;
    const timeoutId = setTimeout(() => {
      setTimerExpired(true);
      dispatch(clearModal());
    }, 10 * 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, [showPaymentModal, dispatch]);

  // 🎉 After payment, success popup + set plan + redirect/unlock
  useEffect(() => {
    if (paymentCompleted && selectedPlanId) {
      dispatch(upgradeSubscriptionPlanThunk(selectedPlanId));
      dispatch(markProfileComplete());
      const successTimer = setTimeout(() => {
        router.push("/dashboard");
        dispatch(clearModal());
      }, 2000);
      return () => clearTimeout(successTimer);
    }
  }, [paymentCompleted, selectedPlanId, dispatch, router]);

  useEffect(() => {
    if (showPaymentModal && paymentMethod === "card" && !paymentCompleted) {
      const timer = setTimeout(() => {
        dispatch(completePayment());
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showPaymentModal, paymentMethod, paymentCompleted, dispatch]);

  if (!showPaymentModal) return null;

  if (timerExpired) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
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
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
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
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full flex items-center justify-center">
          <SuccessPopup
            message="Payment successful!"
            showButton={false}
            autoClose={2000}
          />
        </div>
      </div>
    );
  }

  if (paymentMethod === "card" && !paymentCompleted) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
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
