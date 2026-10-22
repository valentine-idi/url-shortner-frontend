import { useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { type CurrentUser } from "../services/services";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    const userStringified = sessionStorage.getItem("currentUser");
    if (!userStringified) return;

    const currentUser = JSON.parse(userStringified);
    setCurrentUser(currentUser);
  };
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
