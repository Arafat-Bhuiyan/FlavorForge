import { Navigate } from "react-router-dom";
import { MyContext } from "../../Provider/Provider";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { admin } = useContext(MyContext);
 if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;