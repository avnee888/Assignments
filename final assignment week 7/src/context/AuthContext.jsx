import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("auth-users") || "[]");
    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: "Email already registered" };
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("auth-users", JSON.stringify(users));
    setUser({ name, email });
    localStorage.setItem("auth-user", JSON.stringify({ name, email }));
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("auth-users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, message: "Invalid email or password" };
    const loggedInUser = { name: found.name, email: found.email };
    setUser(loggedInUser);
    localStorage.setItem("auth-user", JSON.stringify(loggedInUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
