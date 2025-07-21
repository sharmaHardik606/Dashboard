"use client";
import { useSelector } from "react-redux";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import ResetForm from "./ResetForm";

export default function ForgotPassword() {
  const step = useSelector((state) => state.forgotpass.step);


  if (step === "email") return <EmailForm />;
  if (step === "otp") return <OtpForm />;
  if (step === "reset") return <ResetForm />;
}
