"use client";
import { useEffect, useState } from "react";
import Products from "../components/Products";
import { ProductModel } from "../models/product";
import { useProduct } from "./context/ProductContext";

export default function Home() {
  const { products } = useProduct();
  return (
    <>
      <div className="hero">
        <h1 className="heading">LET’S SHOP</h1>
      </div>
      <h1 className="subheading">Products</h1>
      <div className="products">
        {products.loading ? (
          <h2>Loading products...</h2>
        ) : (
          <Products products={products.data} />
        )}
      </div>
    </>
  );
}
