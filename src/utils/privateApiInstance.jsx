import axios from "axios";
import publicApiInstance from "./publicApiInstance";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export const isAccessTokenExpired = (access_token) => {
  if (!access_token) return true; // no token means expired

  try {
    const decodedToken = jwtDecode(access_token);
   
    // decodedToken.exp is in seconds, Date.now() gives ms
    return decodedToken.exp <= Math.floor(Date.now() / 1000);
  } catch (error) {
    console.error("JWT Decode failed:", error);
    return true; // treat as expired if invalid
  }
};

const authApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Helper function to refresh tokens
const refreshTokens = async () => {
  const refresh_token = localStorage.getItem("refresh_token");

  if (!refresh_token) return null;

  try {
    const { data, status } = await publicApiInstance.post("/get/new/token/", {
      refresh: refresh_token,
    });

    if (status === 200 && data?.access) {
      console.log("Token refreshed successfully");
      localStorage.setItem("access_token", data.access);
      return data.access;
    } else {
      throw new Error("Failed to refresh token.");
    }
  } catch (error) {
    console.error("Session expired. Refresh failed:", error);
    localStorage.clear(); // clear storage on failure
    window.location.href = "/login";
    return null;
  }
};

// Add request interceptor
authApiInstance.interceptors.request.use(
  async (req) => {
    let access_token = localStorage.getItem("access_token");

    // Only refresh token if expired
    if (isAccessTokenExpired(access_token)) {
      console.warn("Access token expired, refreshing...");

      // Try to refresh the token
      access_token = await refreshTokens();

      if (access_token) {
        req.headers.Authorization = `Bearer ${access_token}`;
      }
    } else {
      req.headers.Authorization = `Bearer ${access_token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// Check if user is logged in when the app mounts (initial page load)
export const checkAuthOnLoad = async () => {
  const access_token = localStorage.getItem("access_token");
  
  if (access_token && !isAccessTokenExpired(access_token)) {
    // Access token is valid, continue with the user logged in
    return true;
  }

  // If no access token or expired, attempt to refresh
  const newAccessToken = await refreshTokens();

  return !!newAccessToken; // returns true if new token was obtained
};

export default authApiInstance;
