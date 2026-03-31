import React, { createContext, useContext, useState, ReactNode } from "react";
import { ADMIN_CREDENTIALS, initialUsers, User } from "@/data/mockData";

export type AuthRole = "admin" | "donor" | "volunteer" | null;

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}

interface AuthContextType {
  user: AuthUser | null;
  role: AuthRole;
  isAuthenticated: boolean;
  adminLogin: (username: string, password: string) => boolean;
  userLogin: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const adminLogin = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setUser({ id: "admin-1", name: "Admin", email: "admin@yuvanext.org", role: "admin" });
      return true;
    }
    return false;
  };

  const userLogin = (email: string, _password: string): boolean => {
    const found = initialUsers.find((u) => u.email === email);
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email, role: found.role });
      return true;
    }
    // Allow any email for demo
    setUser({ id: "demo-user", name: email.split("@")[0], email, role: "donor" });
    return true;
  };

  const register = (name: string, email: string, _phone: string, _password: string): boolean => {
    setUser({ id: `usr-${Date.now()}`, name, email, role: "donor" });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        adminLogin,
        userLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
