import { Navigate } from "react-router-dom";
import { useAuth } from "../../pages/Auth/Login/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default ProtectedRoute;