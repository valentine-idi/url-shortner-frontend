import { useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { type CurrentUser } from "../services/services";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    updateSessionStorage();
  }, [currentUser]);

  const updateSessionStorage = () => {
    if (isFirstLoad) return setIsFirstLoad(false);

    if (!currentUser) return sessionStorage.removeItem("currentUser");

    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

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
