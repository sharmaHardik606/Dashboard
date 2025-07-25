"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  hidePayment,
  completePayment,
  clearModal,
} from "@/redux/slices/paymentModalSlice";
import { completeProfile } from "@/redux/slices/profileSlice";

// --- Redux-only control, no props needed
export default function PaymentModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const showPaymentModal = useSelector(
    (state) => state.paymentModal.showPaymentModal
  );
  const paymentCompleted = useSelector(
    (state) => state.paymentModal.paymentCompleted
  );

  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    if (!showPaymentModal) return;

    const timeoutId = setTimeout(() => {
      setTimerExpired(true);
      dispatch(clearModal());
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearTimeout(timeoutId);
    // (Redux stores the timeout for other actions if needed)
  }, [showPaymentModal, dispatch]);

  // watch payment completion to handle redirect + mark profile complete
  useEffect(() => {
    if (paymentCompleted) {
      // Option 1 (mock only, for now):
      dispatch(completeProfile());
      const successTimer = setTimeout(() => {
        router.push("/dashboard");
        dispatch(clearModal());
      }, 2200);
      return () => clearTimeout(successTimer);

      // Option 2 (future: backend integration)
      /*
      // Uncomment when backend is ready:
      // fake call: await api.verifyPayment(...);
      if (paymentSuccessFromApi) {
        dispatch(completeProfile());
        router.push('/dashboard');
      } else {
        // show error feedback, don't complete profile
      }
      */
    }
  }, [paymentCompleted, dispatch, router]);

  if (!showPaymentModal) return null;

  // show timeout UI if needed
  if (timerExpired) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="mb-2 font-semibold text-red-600">
            Payment session expired.
          </p>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => {
              setTimerExpired(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full">
        {!paymentCompleted ? (
          <>
            <Image
              src="/public/payment.png"
              alt="Complete Payment"
              width={400}
              height={300}
              className="w-full h-auto"
            />
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded w-full"
              // Real payment: trigger payment API
              onClick={() => {
                // For production: Replace with call to real API (see below)
                dispatch(completePayment());

                // ** WHEN BACKEND IS READY **
                // async function handleRealPayment() {
                //   const response = await fetch('/api/payment', { method: 'POST', /*...*/ });
                //   // check response, then...
                //   if (response.ok) dispatch(completePayment());
                //   else // show error...
                // }
              }}
            >
              Mock Success
            </button>
          </>
        ) : (
          <Image
            src="/public/sucess-popover.png"
            alt="Payment Successful"
            width={400}
            height={300}
            className="w-full h-auto"
          />
        )}
      </div>
    </div>
  );
}
