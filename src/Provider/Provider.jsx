import { createContext, use, useEffect, useState } from "react";
import publicApiInstance from "../utils/publicApiInstance";
import { auth } from "../utils/firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const provider = new GoogleAuthProvider();

  // ✅ User login
  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const { data, status } = await publicApiInstance.post("/login/", {
        email,
        password,
      });

      console.log("login Data", data);

      if (status === 200) {
        localStorage.setItem("access_token", data?.access);
        localStorage.setItem("refresh_token", data?.refresh);
        localStorage.setItem("user", JSON.stringify(data?.user));
        setUser(data?.user);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ email, password, confirmPassword }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, status } = await publicApiInstance.post("/sign-up/", {
        email,
        password,
        confirmPassword,
      });

      // Optionally store tokens & user if API returns them
      if (status === 201) {
        localStorage.setItem("access_token", data?.access);
        localStorage.setItem("refresh_token", data?.refresh);
        localStorage.setItem("user", JSON.stringify(data?.user));
        setUser(data?.user);
      }
    } catch (error) {
      console.error(error);
      setError("Signup failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google login (with backend)
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Firebase popup দিয়ে sign in করাও
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("RESULT:", result);
      console.log("Firebase Google user:", user);
      console.log("Email:", user.email);
      console.log("UID:", user.uid);

      // 2. এখন backend এ পাঠাও
      // তোমার backend যদি uid কে password হিসেবে expect করে, তাহলে এটাকে পাঠাও
      // অন্যথায় idToken/accessToken পাঠাও
      const { data, status } = await publicApiInstance.post("/login/", {
        email: user.email,
        password: user.uid, // অথবা user.accessToken / user.stsTokenManager.accessToken
      });

      console.log("Google login API response:", data);

      // 3. সফল হলে Firebase থেকে name & photo merge করো + localStorage ও context update করো
      if (status === 200) {
        const updatedUser = {
          ...data.user,
          full_name: user.displayName || data.user.full_name,
          image_url: user.photoURL || data.user.image_url,
        };

        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setUser(updatedUser); // Context update → Navbar বা অন্য component এ show করবে

        // 4. route change
        window.location.href = "/";
      } else {
        setError("Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setError("An error occurred during Google login.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google signup (with backend)
  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Sign in using Firebase popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("RESULT:", result);
      console.log("Firebase Google user:", user);
      console.log("Email:", user.email);
      console.log("UID:", user.uid);

      // 2. Now send it to the backend
      // If your backend expects the uid as the password, send it as such
      // Otherwise, send the idToken/accessToken
      const { data, status } = await publicApiInstance.post("/sign-up/", {
        email: user.email,
        password: user.uid, // অথবা user.accessToken / user.stsTokenManager.accessToken
        confirmPassword: user.uid,
      });

      console.log("Google login API response:", data);
      if (data) {
        // direct route change
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Google Signup Error:", error);
      // Check if error response exists
      if (error.response && error.response.data && error.response.data.email) {
        const errMsg = error.response.data.email[0];

        if (errMsg === "user with this email already exists.") {
          toast.error(
            "This email is already registered. Please use a different email."
          );
        } else {
          toast.error(errMsg); // baki email related error
        }
      } else {
        // General fallback error
        toast.error("An error occurred during Google login.");
      }
      setError("An error occurred during Google login.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page after logout
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        login,
        loading,
        error,
        logout,
        signup,
        handleGoogleLogin,
        handleGoogleSignup,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
