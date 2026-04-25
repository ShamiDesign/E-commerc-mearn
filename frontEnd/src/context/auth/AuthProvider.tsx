import { useState, type FC, type PropsWithChildren } from "react";
import { authContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username"),
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const isAuthenticated = !!token;
  
  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  return (
    <authContext.Provider value={{ username, token, login, isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};
export default AuthProvider;
