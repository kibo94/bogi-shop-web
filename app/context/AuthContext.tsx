"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../../models/user";
import { axiosInstance } from "../../utilis/api";
import { useRouter } from "next/navigation";

type authContextType = {
  user: User | null;
  resetError: () => void;
  loginUser: (email: String, password: String) => void;
  registerUser: (
    email: String,
    password: String,
    fullName: String,
    address: String,
    city: String,
    phone: String
  ) => void;
  error: String;
};

const authContextDefaultValues: authContextType = {
  user: null,
  loginUser: (email, password) => {},
  registerUser: () => {},
  resetError: () => {},
  error: "",
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);
export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<String>("");
  const router = useRouter();

  function resetError() {
    setError("");
  }
  async function loginUser(email: String, password: String) {
    try {
      const res = await axiosInstance.post("login", {
        email,
        password,
      });
      const user = await res.data.user;
      setUser(user);
      router.push("/");
    } catch (error) {
      setError("Wrong password or email");
    }
  }
  async function registerUser(
    email: String,
    password: String,
    fullName: String,
    address: String,
    city: String,
    phone: String
  ) {
    try {
      await axiosInstance.post("register", {
        email,
        password,
        fullName,
        address,
        city,
        phone,
      });
      router.push("/login");
    } catch (error) {
      setError("User exists");
    }
  }
  const value = {
    user: user,
    error: error,
    loginUser: loginUser,
    registerUser: registerUser,
    resetError: resetError,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
