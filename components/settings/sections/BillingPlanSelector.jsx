"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

export default function BillingPlanSelector({ plans, onPlanSelect, onBack }) {
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

  const selectedPlan = watch("plan");
  const paymentMethod = watch("paymentMethod");

  const submitHandler = (data) => {
    if (!data.plan) return;
    console.log('BillingPlanSelector: Plan selected', data.plan, data.paymentMethod);
    onPlanSelect(data.plan, data.paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <h2 className="text-xl font-semibold text-left">Upgrade Plan</h2>
      
      <div className="grid sm:grid-cols-3 gap-4">
        {plans.map((plan) => (
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
        ))}
      </div>
      
      {errors.plan && (
        <p className="text-xs text-red-500">Please select a plan</p>
      )}
      <input type="hidden" {...register("plan", { required: true })} />

      <div>
        <Label className="mb-2 block text-sm font-medium">Payment Method:</Label>
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
      </div>

      {paymentMethod === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Card Number</Label>
            <Input {...register("cardNumber", { required: "Card number required" })} />
            {errors.cardNumber && (
              <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
            )}
          </div>
          <div>
            <Label>Expiry Date</Label>
            <Input placeholder="MM/YY" {...register("expiry", { required: "Expiry required" })} />
            {errors.expiry && (
              <p className="text-xs text-red-500">{errors.expiry.message}</p>
            )}
          </div>
          <div>
            <Label>CVV</Label>
            <Input type="password" {...register("cvv", { required: "CVV required" })} />
            {errors.cvv && (
              <p className="text-xs text-red-500">{errors.cvv.message}</p>
            )}
          </div>
          <div>
            <Label>Card Holder's Name</Label>
            <Input {...register("cardName", { required: "Name required" })} />
            {errors.cardName && (
              <p className="text-xs text-red-500">{errors.cardName.message}</p>
            )}
          </div>
        </div>
      )}

      {paymentMethod === "upi" && (
        <div>
          <Label>UPI ID</Label>
          <Input {...register("upiId", { required: "UPI ID required" })} />
          {errors.upiId && (
            <p className="text-xs text-red-500">{errors.upiId.message}</p>
          )}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="mainblue">
          Upgrade Plan
        </Button>
      </div>
    </form>
  );
}