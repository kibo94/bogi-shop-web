"use client";
import Link from "next/link";
import React from "react";
import { useProduct } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import "../styles/sidebar.css";
interface NavLinksProps {
  closeSideBar: () => void;
}
function NavLinks({ closeSideBar }: NavLinksProps) {
  const { cart, favorites } = useProduct();
  const { user } = useAuth();
  return (
    <ul>
      <li onClick={() => closeSideBar()}>
        <Link href="/">Home</Link>
      </li>

      <li onClick={() => closeSideBar()}>
        <Link href="/products">Products</Link>
      </li>
      <li>
        <Link href="/cart">Cart({cart.length})</Link>
      </li>
      <li onClick={() => closeSideBar()}>
        <Link href="/favorites">Favorites({favorites.length})</Link>
      </li>

      {user != null ? (
        <li>
          <Link href="/profile">{user?.email}</Link>
        </li>
      ) : (
        <li onClick={() => closeSideBar()}>
          <Link href="/login">Login</Link>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
