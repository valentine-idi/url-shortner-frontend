import { createContext, type Dispatch, type SetStateAction } from "react";
import { type CurrentUser } from "../services/services";

interface AuthContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
