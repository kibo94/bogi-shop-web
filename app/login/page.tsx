"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import z from "zod";
import { useAuth } from "../context/AuthContext";
import FormErrors from "../components/FormErrors";

function LoginPage() {
  const { loginUser, error, resetError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<String[]>([]);
  useEffect(() => {
    console.log("page rendered");
    resetError();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-6xl mb-16">Login</h1>

      <input
        type="email"
        className="px-4 py-2 mb-4 auth-input"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        className=" px-4 py-2 auth-input mb-8"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="auth-button"
        onClick={() => {
          if (loginValidation()) {
            loginUser(email, password);
          }
        }}
      >
        Login
      </button>

      <FormErrors errors={errors} />
      {error && <p className="error-message">{error}</p>}

      {/* <AuthButton name={"Login"} email={email} password={password} /> */}
      <p className="mt-4 text-grey">
        Do you hava a account? <Link href={"/register"}>Sign up</Link>
      </p>
    </div>
  );

  function loginValidation() {
    let formErrors: String[] = [];
    var valid = true;
    const isEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.toLowerCase().match(isEmail)) {
      formErrors.push("Email is not valid");
      valid = false;
    }
    if (password.length == 0) {
      formErrors.push("Password is required");
      valid = false;
    }
    console.log(errors);
    setErrors(formErrors);
    return valid;
  }
}

export default LoginPage;
