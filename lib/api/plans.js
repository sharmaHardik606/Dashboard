// lib/api/plans.js

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "49",
    duration: "monthly",
    currency: "USD",
    features: [
      "Access to basic equipment",
      "Standard gym hours",
      "Group fitness classes"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    price: "99",
    duration: "monthly",
    currency: "USD",
    features: [
      "All basic features",
      "Extended gym hours",
      "Personal training sessions"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "149",
    duration: "monthly",
    currency: "USD",
    features: [
      "All standard features",
      "24/7 access",
      "Exclusive events"
    ]
  }
];

export async function getPlans() {
  await delay(200); // Simulate network/API delay
  return PLANS;
}

// You can add a fake subscription handler if needed later
export async function subscribeToPlan(planId) {
  await delay(300);
  // Here you could mutate a userPlan variable, etc.
  return { success: true, planId };
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
