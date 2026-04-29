import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
const ProtectedRout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return<Navigate to="/login" replace />;
  }
  console.log("Protected Cart");
  return <Outlet />;
};

export default ProtectedRout;
