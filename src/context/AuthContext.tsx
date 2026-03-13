"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getToken, setToken, removeToken } from "@/lib/auth";
import api from "@/lib/api";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const initialUser = useMemo(() => {
    const token = getToken();
    return token ? { token, email: "" } : null;
  }, []);

  if (user === null && initialUser !== null) {
    setUser(initialUser);
  }

  async function login(email: string, senha: string) {
    const { data } = await api.post("/auth/login", { email, senha });
    setToken(data.token);
    setUser({ token: data.token, email });
    router.push("/dashboard");
  }

  async function register(nome: string, email: string, senha: string) {
    await api.post("/auth/register", { nome, email, senha });
  }

  function logout() {
    removeToken();
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
