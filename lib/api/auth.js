
import { mockUser } from "../mockAuth";

// --- MOCK LOGIN ---
export async function loginUser(email, password) {
  // For dev only: Simulate login, matching dummy/mock credentials
  if (email === mockUser.email && password === mockUser.password) {
    // Simulate returned data from backend
    return {
      user: {
        name: mockUser.name,
        email: mockUser.email,
      },
      token: mockUser.token,
    };
  }
  // Simulate "bad credentials"
  throw new Error("Invalid email or password.");
  
  // --- When backend is ready---
  /*
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }
    return await res.json(); // { user, token }
  } catch (error) {
    throw error;
  }
  */
}


// --- MOCK SIGNUP ---
export async function signupUser(data) {
  // For dev only: Simulate signup always "succeeds"
  return {
    success: true,
    user: {
      name: data.name,
      email: data.email,
    },
    token: "mocked-signup-token-123",
    message: "Signup success (mocked)",
  };

  // --- When backend is ready, use the code below instead ---
  /*
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorMessage = "Signup failed";
      try {
        const error = await res.json();
        errorMessage = error.message || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }

    return await res.json(); // e.g. { success: true, user: {}, token: "...", message: "..." }
  } catch (error) {
    throw error;
  }
  */
}
