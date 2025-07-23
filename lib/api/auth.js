export async function loginUser(email, password) {
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
}


export async function signupUser(data) {
  // 🔧 MOCK IMPLEMENTATION (since backend not ready)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("✅ Mock signup success. Data received:", data);

      // Simulate success response
      resolve({
        success: true,
        message: "OTP sent to email",
        // Mock token or user data if needed
      });
    }, 1000);
  });

  // ❌ REAL API CALL — comment this out until backend is ready
  /*
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Signup failed");
    }

    return await res.json(); // { user, token }
  } catch (error) {
    throw error;
  }
  */
}

