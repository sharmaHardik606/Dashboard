"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  showPayment,
  setPaymentMethod,
} from "@/redux/slices/paymentModalSlice";
import { fetchSubscriptionPlans } from "@/redux/slices/subscriptionPlanSlice";

export default function StepTwoChoosePlan({ onBack, mode = "profile" }) {
  const dispatch = useDispatch();
  const plans = useSelector(
    (state) => state.subscriptionPlans.subscriptionPlans
  );
  const loading = useSelector((state) => state.subscriptionPlans.loading);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      plan: "",
      paymentMethod: "card",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: "",
    },
  });

  useEffect(() => {
    if (!plans || plans.length === 0) {
      dispatch(fetchSubscriptionPlans());
    }
  }, [dispatch, plans]);

  const selectedPlan = watch("plan");
  const paymentMethod = watch("paymentMethod");
  const heading = mode === "billing" ? "Upgrade Plan" : "Step 2: Choose Plan";

  const submitHandler = (data) => {
    dispatch(setPaymentMethod(data.paymentMethod));
    dispatch(showPayment());
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 ">
      <h2 className="text-xl font-semibold text-left">{heading}</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 text-center text-gray-500 py-8">
            Loading plans...
          </div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className={clsx(
                "border rounded-xl p-4 cursor-pointer transition",
                selectedPlan === plan.id
                  ? "border-blue-600 shadow-md bg-blue-50"
                  : "border-gray-300"
              )}
              onClick={() => {
                setValue("plan", plan.id);
                trigger("plan");
              }}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setValue("plan", plan.id);
                  trigger("plan");
                }
              }}
              role="button"
              aria-pressed={selectedPlan === plan.id}
            >
              <div className="text-lg font-bold">{plan.name}</div>
              <div className="text-xl font-semibold">
                {plan.price}/{plan.duration}
              </div>
              <ul className="text-sm mt-2 space-y-1">
                {plan.features.map((feat) => (
                  <li key={feat}>✔ {feat}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      {errors.plan && (
        <p className="text-xs text-red-500">Please select a plan</p>
      )}
      <input type="hidden" {...register("plan", { required: true })} />

      <div>
        <Label className="mb-2 block text-sm font-medium">
          Payment Method:
        </Label>
        <RadioGroup
          defaultValue="card"
          onValueChange={(val) => {
            setValue("paymentMethod", val);
            trigger("paymentMethod");
          }}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card">Credit/Debit Card</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi">UPI</Label>
          </div>
        </RadioGroup>
        <input
          type="hidden"
          {...register("paymentMethod", { required: true })}
        />
        {errors.paymentMethod && (
          <p className="text-xs text-red-500">Please select a payment method</p>
        )}
      </div>

      {paymentMethod === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className={"mb-2"}>Card Number</Label>
            <Input
              {...register("cardNumber", { required: "Card number required" })}
            />
            {errors.cardNumber && (
              <p className="text-xs text-red-500">
                {errors.cardNumber.message}
              </p>
            )}
          </div>
          <div>
            <Label className={"mb-2"}>Expiry Date</Label>
            <Input
              placeholder="MM/YY"
              {...register("expiry", { required: "Expiry required" })}
            />
            {errors.expiry && (
              <p className="text-xs text-red-500">{errors.expiry.message}</p>
            )}
          </div>
          <div>
            <Label className={"mb-2"}>CVV</Label>
            <Input
              type="password"
              {...register("cvv", { required: "CVV required" })}
            />
            {errors.cvv && (
              <p className="text-xs text-red-500">{errors.cvv.message}</p>
            )}
          </div>
          <div>
            <Label className={"mb-2"}>Card Holder's Name</Label>
            <Input {...register("cardName", { required: "Name required" })} />
            {errors.cardName && (
              <p className="text-xs text-red-500">{errors.cardName.message}</p>
            )}
          </div>
        </div>
      )}
      {paymentMethod === "upi" && (
        <div>
          <Label className={"mb-2"}>UPI ID</Label>
          <Input {...register("upiId", { required: "UPI ID required" })} />
          {errors.upiId && (
            <p className="text-xs text-red-500">{errors.upiId.message}</p>
          )}
        </div>
      )}

      <div className="flex justify-between pt-4 ">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant={"mainblue"}>
          Submit
        </Button>
      </div>
    </form>
  );
}
