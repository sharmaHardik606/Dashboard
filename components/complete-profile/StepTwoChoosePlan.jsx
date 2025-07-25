"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import {
  showPayment,
  setPaymentMethod,
} from "@/redux/slices/paymentModalSlice";

export default function StepTwoChoosePlan({ onBack }) {
  const { register, handleSubmit, setValue, watch } = useForm({
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
  const dispatch = useDispatch();

  const selectedPlan = watch("plan");
  const paymentMethod = watch("paymentMethod");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$49/month",
      features: [
        "Access to basic equipment",
        "Standard gym hours",
        "Group fitness classes",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: "$99/month",
      features: [
        "All basic features",
        "Extended gym hours",
        "Personal training sessions",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$149/month",
      features: ["All standard features", "24/7 access", "Exclusive events"],
    },
  ];

  // When user submits plan, open payment modal (do not complete profile yet)
  const submitHandler = (data) => {
    console.log("Form Data at submit:", data);
    dispatch(setPaymentMethod(data.paymentMethod));
    dispatch(showPayment()); // <---  openes  payment modal!
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 ">
      <h2 className="text-xl font-semibold text-center">
        Step 2 - Choose Plan
      </h2>
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
            onClick={() => setValue("plan", plan.id)}
          >
            <div className="text-lg font-bold">{plan.name}</div>
            <div className="text-xl font-semibold">{plan.price}</div>
            <ul className="text-sm mt-2 space-y-1">
              {plan.features.map((feat) => (
                <li key={feat}>✔ {feat}</li>
              ))}
            </ul>
            {selectedPlan === plan.id && (
              <div className="mt-3 text-blue-600 font-medium">Selected</div>
            )}
          </div>
        ))}
      </div>

      <div>
        <Label className="mb-2 block text-sm font-medium">
          Payment Method:
        </Label>
        <RadioGroup
          defaultValue="card"
          onValueChange={(val) => setValue("paymentMethod", val)}
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
      </div>
      {paymentMethod === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className={"mb-2"}>Card Number</Label>
            <Input {...register("cardNumber")} />
          </div>
          <div>
            <Label className={"mb-2"}>Expiry Date</Label>
            <Input placeholder="MM/YY" {...register("expiry")} />
          </div>
          <div>
            <Label className={"mb-2"}>CVV</Label>
            <Input type="password" {...register("cvv")} />
          </div>
          <div>
            <Label className={"mb-2"}>Card Holder's Name</Label>
            <Input {...register("cardName")} />
          </div>
        </div>
      )}
      {paymentMethod === "upi" && (
        <div>
          <Label className={"mb-2"}>UPI ID</Label>
          <Input {...register("upiId")} />
        </div>
      )}
      <div className="flex justify-between pt-4 ">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant={"mainblue"}>Submit</Button>
      </div>
    </form>
  );
}
