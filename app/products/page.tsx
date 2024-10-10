"use client";
import React from "react";
import Products from "../../components/Products";
import useFetchData from "@hooks/useProducts";
function ProductsPage() {
  const [products, setProducts] = useFetchData("/api/products");
  return <Products products={products.data} />;
}

export default ProductsPage;
