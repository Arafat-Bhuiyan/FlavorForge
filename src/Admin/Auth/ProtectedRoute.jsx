import { Navigate } from "react-router-dom";
import { MyContext } from "../../Provider/Provider";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const {user} = useContext(MyContext);
  if (!user) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default ProtectedRoute;