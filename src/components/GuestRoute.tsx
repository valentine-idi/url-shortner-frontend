import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const GuestRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
