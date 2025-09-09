import axios from "axios";
import publicApiInstance from "./publicApiInstance";
import { toast } from "react-toastify";
import { isAccessTokenExpired } from "./useAuth";

const authApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

authApiInstance.interceptors.request.use(
  async (req) => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    // If we have an access token, add it to request header
    if (access_token) {
      req.headers.Authorization = `Bearer ${access_token}`;
    }

    // Check if the access token is expired
    if (!isAccessTokenExpired()) {
      return req;
    }

    try {
      // Refresh the token
      const { data, status } = await publicApiInstance.post("/get/new/token/", {
        refresh: refresh_token,
      });

      if (status === 200 && data?.access) {
        // Update tokens in localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        // Update request with new access token
        req.headers.Authorization = `Bearer ${data.access}`;
        return req;
      } else {
        // Handle failure to refresh tokens
        throw new Error("Failed to refresh token.");
      }
    } catch (error) {
      toast.error("Session expired. Please log in again.");
      // Reject the request, triggering a logout (or redirect to login)
      // You can also dispatch a logout action or redirect to login page
      window.location.href = "/login";  // Forcing redirection to login page
      return Promise.reject(error); // Reject the request to stop the API call
    }
  },
  (error) => {
    return Promise.reject(error); // Reject in case of a request error
  }
);

export default authApiInstance;
