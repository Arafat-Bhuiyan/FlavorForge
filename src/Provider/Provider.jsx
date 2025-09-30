import { createContext, use, useEffect, useState } from "react";
import publicApiInstance from "../utils/publicApiInstance";
import { auth } from "../utils/firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);

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
      const { data, status } = await publicApiInstance.post("/sign-up/", {
        email: user.email,
        password: user.uid, // অথবা user.accessToken / user.stsTokenManager.accessToken
        confirmPassword: user.uid,
      });

      console.log("Google login API response:", data);
      if (data) {
        // direct route change
        window.location.href = "/login"; // এখানে login বা যেকোনো route দিতে পারো
      }
    } catch (error) {
      console.error("Google Signup Error:", error);
      setError("An error occurred during Google login.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login function
  const adminLogin = (data) => {
    setAdmin(data);
    localStorage.setItem("admin", JSON.stringify(data));
  };

  // ✅ Logout function
  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  // ✅ On first load, restore from localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  useEffect(() => {
    console.log("Provider Admin State Updated:", admin);
  }, [admin]);

  const logout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const loggedInAdmin = localStorage.getItem("admin");
    if (loggedInAdmin) {
      setAdmin(JSON.parse(loggedInAdmin));
    }
  }, []);

  // const handleGoogleLogin = () => {
  //   setLoading(true);
  //   return signInWithPopup(auth, provider);
  // };

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        login,
        admin,
        adminLogin,
        adminLogout,
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
