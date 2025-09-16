import { createContext, useEffect, useState } from "react";
import publicApiInstance from "../utils/publicApiInstance";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        localStorage.setItem("refresh", data?.refresh);
        localStorage.setItem("user", JSON.stringify(data?.user));
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  };

  useEffect (()=>{
    const loggedInUser = localStorage.getItem("user");
    setUser(loggedInUser);
  },[])
  return (
    <MyContext.Provider value={{ user,setUser, login, loading, error,logout }}>
      {children}
    </MyContext.Provider>
  );
};
