import { createContext, useEffect, useState } from "react";
import publicApiInstance from "../utils/publicApiInstance";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);

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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
