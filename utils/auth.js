export const login = (token) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("token");
  return !!token;
};

