import { Navigate, Outlet } from "react-router-dom";
import TokenExpire from "../helper/TokenExpire";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token || token === "null" || TokenExpire(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
