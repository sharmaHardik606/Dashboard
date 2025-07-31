// /lib/api/profile.js
let PROFILE = {
  businessName: "",
  contactNumber: "",
  email: "",
  website: "",
  documents: [],
  year: "",
  address: "",
  isComplete: false,
};

export async function getProfile() {
  await delay(200);
  return { ...PROFILE };
}

export async function submitProfile(data) {
  await delay(300);
  PROFILE = { ...PROFILE, ...data };
  return { success: true };
}

export async function markProfileComplete() {
  await delay(200);
  PROFILE.isComplete = true;
  return { success: true };
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
