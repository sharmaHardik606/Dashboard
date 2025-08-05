// lib/api/subscriptionPlans.js

const SUBSCRIPTION_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "$49",
    duration: "month",
    features: [
      "Access to basic equipment",
      "Standard gym hours",
      "Add up to 100 members"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    price: "$99",
    duration: "month",
    features: [
      "All basic features",
      "Extended gym hours",
      "Personal training sessions"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "$149",
    duration: "month",
    features: [
      "All standard features",
      "24/7 access",
      "Exclusive events"
    ]
  }
];

let CURRENT_SUBSCRIPTION_PLAN_ID = "basic";

export async function getSubscriptionPlans() {
  await delay(300);
  return SUBSCRIPTION_PLANS;
}

export async function getCurrentSubscriptionPlan() {
  await delay(200);
  return SUBSCRIPTION_PLANS.find(p => p.id === CURRENT_SUBSCRIPTION_PLAN_ID);
}

export async function upgradeSubscriptionPlan(newPlanId) {
  console.log('API: upgradeSubscriptionPlan called with:', newPlanId);
  console.log('API: Current plan ID before upgrade:', CURRENT_SUBSCRIPTION_PLAN_ID);
  
  await delay(500);
  CURRENT_SUBSCRIPTION_PLAN_ID = newPlanId;
  
  console.log('API: Current plan ID after upgrade:', CURRENT_SUBSCRIPTION_PLAN_ID);
  
  const updatedPlan = getCurrentSubscriptionPlan();
  console.log('API: Returning updated plan:', updatedPlan);
  
  return updatedPlan;
}

export async function cancelSubscriptionPlan() {
  await delay(400);
  CURRENT_SUBSCRIPTION_PLAN_ID = null;
  return { cancelled: true };
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
