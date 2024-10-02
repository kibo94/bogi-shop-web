"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import FormErrors from "../../components/FormErrors";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const { registerUser, resetError, error } = useAuth();
  const [errors, setErrors] = useState<String[]>([]);
  useEffect(() => {
    console.log("page rendered");
    resetError();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-6xl mb-16">Register</h1>
      <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-6 mb-8">
        <input
          type="text"
          className="px-4 py-2  auth-input"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          className=" px-4 py-2 auth-input "
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className=" px-4 py-2 auth-input "
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          className=" px-4 py-2 auth-input "
          placeholder="Enter your address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <input
          type="text"
          className=" px-4 py-2 auth-input "
          placeholder="Enter your phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          className=" px-4 py-2 auth-input "
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <button
        className="auth-button"
        onClick={() => {
          if (registerValidation()) {
            registerUser(email, password, fullName, street, city, phone);
          }
        }}
      >
        Register
      </button>

      <FormErrors errors={errors} />
      {error && <p className="error-message">{error}</p>}
      <p className="mt-4 text-grey">
        Already hava a account? <Link href={"/login"}>Sign in</Link>
      </p>
    </div>
  );

  function registerValidation() {
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
    if (fullName.length == 0) {
      formErrors.push("Full Name is required");
      valid = false;
    }
    if (street.length == 0) {
      formErrors.push("Address is required");
      valid = false;
    }
    if (phone.length == 0) {
      formErrors.push("Phone is required");
      valid = false;
    }
    if (city.length == 0) {
      formErrors.push("City is required");
      valid = false;
    }
    console.log(errors);
    setErrors(formErrors);
    return valid;
  }
}

export default RegisterPage;
