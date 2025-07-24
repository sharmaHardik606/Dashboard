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
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // ❌ Handle non-2xx status codes
    if (!res.ok) {
      let errorMessage = "Signup failed";
      try {
        const error = await res.json();
        errorMessage = error.message || errorMessage;
      } catch {
        // response isn't JSON
      }
      throw new Error(errorMessage);
    }

    // ✅ Expected JSON response
    return await res.json(); // e.g. { success: true, user: {}, token: "...", message: "..." }

  } catch (error) {
    // ⛔ Pass error up to caller (e.g., component)
    throw error;
  }
}

