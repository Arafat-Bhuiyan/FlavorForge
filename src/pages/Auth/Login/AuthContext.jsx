"use client";

import { createContext, useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";  // Corrected import statement

const AuthContext = createContext();

const isValidJWT = (token) => {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const decoded = jwtDecode(token);  // Use jwtDecode to decode the token
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
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log(
        "[v0] Token from localStorage:",
        token.substring(0, 50) + "..."
      );
      if (isValidJWT(token)) {
        try {
          const decoded = jwtDecode(token);  // Use jwtDecode to decode the token
          setUser(decoded);
        } catch (err) {
          console.error("Invalid token", err);
          localStorage.removeItem("access_token");
          setUser(null);
        }
      } else {
        console.error("Token format is invalid - not a proper JWT");
        localStorage.removeItem("access_token");
        setUser(null);
      }
    }
  }, []);

  const login = (tokenData) => {
    let accessToken, refreshToken;

    if (typeof tokenData === "string") {
      accessToken = tokenData;
    } else if (typeof tokenData === "object" && tokenData.access_token) {
      accessToken = tokenData.access_token;
      refreshToken = tokenData.refresh_token;
    } else {
      console.error("Invalid token format", tokenData);
      return;
    }

    console.log(
      "[v0] Received access token:",
      accessToken ? accessToken.substring(0, 50) + "..." : "null/undefined"
    );

    if (!isValidJWT(accessToken)) {
      console.error("Access token is not a valid JWT format");
      logout(); // Log out if token is invalid
      return;
    }

    // Store tokens in localStorage
    localStorage.setItem("access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }

    try {
      const decoded = jwtDecode(accessToken);  // Use jwtDecode to decode the token
      setUser(decoded);
      console.log("[v0] Login successful, user:", decoded);
    } catch (err) {
      console.error("Invalid token", err);
      logout(); // Clear invalid token and logout
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
