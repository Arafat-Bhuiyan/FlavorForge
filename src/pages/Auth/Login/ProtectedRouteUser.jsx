import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useContext } from "react";
import { MyContext } from "../../../Provider/Provider";

const ProtectedRouteUser = ({ children }) => {
  const {user} = useContext(MyContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRouteUser;
