let PROFILE = {
  businessName: "",
  contactNumber: "",
  email: "",
  website: "",
  documents: [], // SAFE: array of strings, e.g., ["proof1.pdf"]
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

// MAIN FIX: mock API returns serializable data only, such as filenames, not files
export async function markProfileComplete() {
  await delay(200);
  PROFILE.isComplete = true;
  return { ...PROFILE }; // Must have isComplete: true, and only serializable fields
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
