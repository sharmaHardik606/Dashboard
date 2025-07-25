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
import { completeProfile } from "@/redux/slices/profileSlice";

export default function PaymentModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const showPaymentModal = useSelector((state) => state.paymentModal.showPaymentModal);
  const paymentCompleted = useSelector((state) => state.paymentModal.paymentCompleted);
  const paymentMethod = useSelector((state) => state.paymentModal.paymentMethod); // "card" or "upi"
  const showUpiPopupState = useSelector((state) => state.paymentModal.showUpiPopup);

  const [timerExpired, setTimerExpired] = useState(false);

  // Timeout: auto-close modal after 10 min
  useEffect(() => {
    if (!showPaymentModal) return;
    const timeoutId = setTimeout(() => {
      setTimerExpired(true);
      dispatch(clearModal());
    }, 10 * 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, [showPaymentModal, dispatch]);

  // Success sequence: dashboard unlock after 2 seconds
  useEffect(() => {
    if (paymentCompleted) {
      dispatch(completeProfile());
      const successTimer = setTimeout(() => {
        router.push("/dashboard");
        dispatch(clearModal());
      }, 2000);
      return () => clearTimeout(successTimer);
    }
  }, [paymentCompleted, dispatch, router]);

  if (!showPaymentModal) return null;

  // Timeout Expired
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

  // UPI: Show waiting popup until payment finishes
  if (paymentMethod === "upi" && !paymentCompleted && !showUpiPopupState) {
    // First step: Show UPI "waiting" popup with manual success in mock
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full">
          {/* Swap for your UPI waiting PNG */}
          <Image
            src="/payment.png"
            alt="Waiting for UPI payment"
            width={400}
            height={300}
            className="w-full h-auto"
          />
          {/* Dev only: Simulate UPI payment success */}
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded w-full"
            onClick={() => {
              dispatch(showUpiPopup());
              // Optionally do a timeout here if you want it to auto-progress
              setTimeout(() => {
                dispatch(hideUpiPopup());
                dispatch(completePayment());
              }, 1000); // shows success after 1 sec
            }}
          >
            Simulate UPI Success
          </button>
        </div>
      </div>
    );
  }

  // Show success popup (after UPI or Card)
  if (paymentCompleted || (paymentMethod === "upi" && showUpiPopupState)) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full">
          <Image
            src="/sucess-popover.png"
            alt="Payment Successful"
            width={400}
            height={300}
            className="w-full h-auto"
          />
        </div>
      </div>
    );
  }

  // Card: Auto-complete after a brief moment, no button
  if (paymentMethod === "card" && !paymentCompleted) {
    useEffect(() => {
      const timer = setTimeout(() => {
        dispatch(completePayment());
      }, 400); // Delay can be 0 for instant or 400ms for feedback
      return () => clearTimeout(timer);
    }, [dispatch]);
    // Optionally show a spinner or just render nothing
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full flex flex-col items-center">
          <Image
            src="/sucess-popover.png"
            alt="Processing..."
            width={400}
            height={300}
            className="w-full h-auto"
          />
          <p className="mt-4 text-blue-700 font-semibold">Processing payment...</p>
        </div>
      </div>
    );
  }

  // Fallback: show nothing or loading
  return null;
}
