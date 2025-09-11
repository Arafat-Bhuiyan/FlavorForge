"use client";

import { createContext, useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode"; // Corrected import statement

const AuthContext = createContext();

const isValidJWT = (token) => {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const decoded = jwtDecode(token); // Use jwtDecode to decode the token
    if (decoded.exp * 1000 < Date.now()) {
      // Check expiration
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data", err);
        localStorage.removeItem("user_data");
        setUser(null);
      }
    }
  }, []);


  const login = (tokenData) => {
    console.log("tokenData",tokenData);
    if (!tokenData || typeof tokenData !== "object") {
      console.error("Invalid user data", tokenData);
      return;
    }

    console.log("[v0] Received user data:", tokenData);

    // Store user data in localStorage
    localStorage.setItem("user_data", JSON.stringify(tokenData));

    // Set user state directly
    setUser(tokenData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_data"); // ✅ correct key now
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
