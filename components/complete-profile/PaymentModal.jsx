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
import SuccessPopup from "@/components/SuccessPopup";


export default function PaymentModal() {
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
  ); // "card" or "upi"
  const showUpiPopupState = useSelector(
    (state) => state.paymentModal.showUpiPopup
  );

  const [timerExpired, setTimerExpired] = useState(false);

  // ⏲️ Timeout: auto-close modal after 10 min
  useEffect(() => {
    if (!showPaymentModal) return;
    const timeoutId = setTimeout(() => {
      setTimerExpired(true);
      dispatch(clearModal());
    }, 10 * 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, [showPaymentModal, dispatch]);

  // 🎉 After payment, success popup + redirect/unlock
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

  // 💳 For CARD, auto-complete after brief moment
  useEffect(() => {
    if (showPaymentModal && paymentMethod === "card" && !paymentCompleted) {
      const timer = setTimeout(() => {
        dispatch(completePayment());
      }, 500); // adjust if you want a longer/shorter pause
      return () => clearTimeout(timer);
    }
  }, [showPaymentModal, paymentMethod, paymentCompleted, dispatch]);

  if (!showPaymentModal) return null;

  // ❌ Timeout Expired
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

  // 💸 UPI: Show waiting popup until upi payment finishes
  if (paymentMethod === "upi" && !paymentCompleted && !showUpiPopupState) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full">
          {/* Your actual UPI waiting PNG here */}
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

  // 🏆 Show success popup (after UPI or Card)
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


  // 💳 (Optional) Card: "Processing..." placeholder for the brief moment before success, if desired.
  if (paymentMethod === "card" && !paymentCompleted) {
    // Don't put any hooks or async code here!
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full flex flex-col items-center">
          {/* Optionally a spinner here; showing payment in progress */}
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

  // Fallback: render nothing
  return null;
}
