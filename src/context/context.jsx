import { createContext, useState, useEffect } from "react";
import publicApiInstance from "../utils/publicApiInstance";
import { toast } from "react-toastify";
import authApiInstance from "../utils/privateApiInstance";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user_data");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("user_profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  const login = async (email, password) => {
    const { data, status } = await publicApiInstance.post("/login/", {
      email,
      password,
    });
    console.log(data);
    if (status === 200) {
      localStorage.setItem("access_token", data?.access);
      localStorage.setItem("refresh_token", data?.refresh);
      localStorage.setItem("user_data", JSON.stringify(data?.user));

      setUser(data.user);
      toast.success("Login successful");
    } else {
      toast.error(data?.response?.data?.error[0]);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_profile"); // Optionally clear profile on logout as well
    setUser(null); // Update state so Navbar reacts
    setProfile(null); // Clear profile as well
  };

  const getProfile = async () => {
    try {
      const { data, status } = await authApiInstance.get("/profile/");
      if (status === 200) {
        setProfile(data);  // Assuming the profile is within data.profile
        localStorage.setItem("user_profile", JSON.stringify(data));  // Store profile in localStorage
      } else {
        toast.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile");
    }
  };

  // Fetch profile on initial load if the user is logged in
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      getProfile();
    }
  }, [user]); // This ensures profile is fetched when user logs in

  return (
    <MyContext.Provider value={{ login, logout, user, profile }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
