// lib/api/payments.js

// Simulate payment processing; store simple local payment state if needed
let PAYMENT_STATUS = "idle"; // "idle" | "processing" | "success" | "failed"

export async function startPayment({ amount, planId, method }) {
  PAYMENT_STATUS = "processing";
  await delay(1000); // Simulate payment session creation
  // In real API you'd return a session/token/clientSecret
  return { sessionId: "fake-session-123", amount, planId, method };
}

export async function confirmPayment({ sessionId, method }) {
  await delay(1200); // Simulate payment gateway time
  PAYMENT_STATUS = "success";
  return { success: true, sessionId, method };
}

export async function getPaymentStatus() {
  await delay(100);
  return { status: PAYMENT_STATUS };
}

// Optional: reset for further testing
export function resetMockPayment() {
  PAYMENT_STATUS = "idle";
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
