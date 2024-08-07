"use client";
import React from "react";
import Products from "../components/Products";
import { useProduct } from "../context/ProductContext";

async function FavoritesPage() {
  const { favorites } = useProduct();
  return (
    <div className="cart">
      <Products products={favorites} />
    </div>
  );
}

export default FavoritesPage;
