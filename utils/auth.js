export const login = () => {};
export const logout = () => {};
export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
};
