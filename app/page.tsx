"use client";
import { useEffect, useState } from "react";
import Products from "../components/Products";
import { ProductModel } from "../models/product";

export default function Home() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/products`);
      const products: ProductModel[] = await response.json();
      setProducts(products);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <div className="hero">
        <h1 className="heading">LET’S SHOP</h1>
      </div>
      <h1 className="subheading">Products</h1>
      <div className="products">
        <Products products={products} />
      </div>
    </>
  );
}
