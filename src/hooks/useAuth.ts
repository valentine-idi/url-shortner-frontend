import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function useAuth() {
  const context = useContext(AuthContext);

  if (context === null)
    throw new Error("Context must be used inside a JSX element");

  return context;
}

export default useAuth;
