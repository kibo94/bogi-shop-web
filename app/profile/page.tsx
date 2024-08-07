"use client";
import React, { use } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-6xl mb-8">Profile</h1>
      <p className="text-2xl mb-2">Full Name: {user?.fullName} </p>
      <p className="text-2xl mb-2">Email Address: {user?.email} </p>
      <p className="text-2xl">Street: {user?.address} </p>
    </div>
  );
}

export default Profile;
