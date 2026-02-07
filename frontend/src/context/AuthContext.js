import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Only for page refresh / direct load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/users/me");
        setUser(res.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔥 FIXED LOGIN
  const login = async (email, password) => {
    const res = await api.post("/api/users/login", { email, password });

    const { accessToken, user } = res.data.data;

    // store token
    document.cookie = `accessToken=${accessToken}; path=/`;

    // 🔥 USE USER FROM LOGIN RESPONSE
    setUser(user);
  };

  const logout = async () => {
    await api.get("/api/users/logout");
    document.cookie = "accessToken=; Max-Age=0; path=/";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
