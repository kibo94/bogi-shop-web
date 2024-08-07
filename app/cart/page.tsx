"use client";
import React from "react";
import CartProducts from "../components/CartProducts";
import "../styles/cart.css";
function CartPage() {
  return (
    <>
      <div className="cart">
        <CartProducts />
      </div>
    </>
  );
}

export default CartPage;
