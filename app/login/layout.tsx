import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/SessionProvider";
import { AuthProvider } from "@app/context/AuthContext";
import { ProductProvider } from "@app/context/ProductContext";
import NavBar from "@components/NavBar";
import Alert from "@components/Alert";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  // https://e-commerce-api-8p0f.onrender.com
}>) {
  return <>{children}</>;
}
