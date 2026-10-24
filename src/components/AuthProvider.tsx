import { useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { type CurrentUser } from "../services/services";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    try {
      const saved = sessionStorage.getItem("currentUser");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
