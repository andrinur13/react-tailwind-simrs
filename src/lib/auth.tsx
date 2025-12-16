// lib/auth.ts
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AuthAPI } from "./api";

const AuthContext = createContext<any>(null);

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage saat awal
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await AuthAPI.login(email, password) as any;

    const token = response.data.token;
    // For now, we'll create a basic user object since the API doesn't return user data
    const user = { email };

    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    logoutUser();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
