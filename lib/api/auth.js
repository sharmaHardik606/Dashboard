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

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Signup failed");
    }

    return await res.json(); // { user, token }
  } catch (error) {
    throw error;
  }
}
