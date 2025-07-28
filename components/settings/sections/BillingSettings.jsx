"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StepTwoChoosePlan from "@/components/complete-profile/StepTwoChoosePlan";
import PaymentModal from "@/components/complete-profile/PaymentModal"; 

export default function BillingSettings() {
  const [showUpgradeForm, setShowUpgradeForm] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold mb-2">
          Billings & Payment Settings
        </h2>
      </div>

      {/* Payment Method Section */}
      <section className=" space-y-3">
        <div className="text-lg font-semibold mb-3">Payment Method</div>
        <div className="flex items-center justify-between bg-blue-50 rounded-lg py-4 px-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full border">
              <img
                src="/razorpay.png"
                alt="Razorpay"
                className="w-8 h-6"
              />
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
      <section className="">
        <div className="mb-4">
          <span className="block text-lg font-semibold mb-1">
            Subscription Plan
          </span>
        </div>

        {!showUpgradeForm ? (
          <div className="flex flex-col sm:flex-row sm:items-start justify-between rounded-xl border-[1.4px] bg-white p-6">
            {/* Plan name and price */}
            <div>
              <div className="text-base font-semibold">Basic</div>
              <div className="text-3xl font-bold">
                $49
                <span className="text-base font-medium text-gray-700 ml-1">
                  /month
                </span>
              </div>
              <ul className="mt-2 mb-1 space-y-1 text-sm text-gray-700 list-disc pl-5">
                <li>Access to basic equipment</li>
                <li>Standard gym hours</li>
                <li>Add up to 100 members</li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-2 sm:mt-0">
              <Button variant="hollow" className="font-medium">
                Cancel Subscription
              </Button>
              <Button
                variant="mainblue"
                className="text-sm font-semibold"
                onClick={() => setShowUpgradeForm(true)}
              >
                Upgrade
              </Button>
            </div>
          </div>
        ) : (
          <div className="border p-4 rounded-xl bg-white">
            <StepTwoChoosePlan mode="billing" />
          </div>
        )}
      </section>

      {/* Payment Modal — always active */}
      <PaymentModal />
    </div>
  );
}
