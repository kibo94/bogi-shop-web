"use client";
import React from "react";
import Products from "../../components/Products";
import { useProduct } from "../context/ProductContext";

async function FavoritesPage() {
  const { favorites } = useProduct();

  return (
    <div className="h-screen">
      {favorites.length > 0 ? (
        <Products isFavorites={true} products={favorites} />
      ) : (
        <h1>No favorites</h1>
      )}
    </div>
  );
}

export default FavoritesPage;
