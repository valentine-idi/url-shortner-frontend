import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../contexts/AuthContext";

const GuestRoute = () => {
  const auth = useContext(AuthContext);
  return auth?.currentUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
