import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load from sessionStorage (NOT localStorage)
  useEffect(() => {
  const savedUser = sessionStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (savedUser && token) {
    setUser(JSON.parse(savedUser));
  } else {
    setUser(null);
  }
}, []);

  // LOGIN
  const login = (userData,token) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // LOGOUT
  const logout = () => {
  setUser(null);
  sessionStorage.removeItem("user");
  localStorage.removeItem("token"); // ✅ add this
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
