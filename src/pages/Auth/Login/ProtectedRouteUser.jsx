import { Navigate } from "react-router-dom";

const ProtectedRouteUser = ({ children }) => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRouteUser;
