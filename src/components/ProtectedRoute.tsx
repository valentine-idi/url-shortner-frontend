import { Outlet, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
