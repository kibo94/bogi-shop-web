"use client";
import React, { useEffect, useState } from "react";
import { ProductModel } from "../../models/product";
import Products from "../../components/Products";
var apiUrl = "http://localhost:4000";
function ProductsPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/products`);
      const products: ProductModel[] = await response.json();
      setProducts(products);
    };
    fetchPosts();
  }, []);

  return <Products products={products} />;
}

export default ProductsPage;
