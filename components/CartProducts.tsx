"use client";
import React from "react";
import productImg from "../public/assets/images/product-img.png";
import Image from "next/image";
import { useProduct } from "../app/context/ProductContext";

function CartProducts() {
  const { cart } = useProduct();
  return (
    <div className="cartProducts">
      {cart.map((c, i) => (
        <div className="cartItem" key={i}>
          <Image src={productImg} alt="product-img" />
          <h2>{c.name}</h2>
          <h3 className="price">{c.price * c.quantity} din</h3>
          <div className="quantity">{c.quantity}</div>
        </div>
      ))}
    </div>
  );
}

export default CartProducts;
