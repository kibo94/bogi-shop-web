"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
interface AuthButtonProps {
  name: String;
  email: string;
  password: String;
}

function AuthButton({ name, email, password }: AuthButtonProps) {
  const { loginUser } = useAuth();
  return (
    <>
      <button
        className="auth-button"
        onClick={() => loginUser(email, password)}
      >
        {name}
      </button>
    </>
  );
}

export default AuthButton;
