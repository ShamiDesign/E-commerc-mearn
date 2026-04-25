import { createContext, useContext } from "react";

interface authContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const authContext = createContext<authContextType | null>({
  username: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(authContext);
