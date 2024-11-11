"use client";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks"; // Make sure hooks are typed correctly
import Products from "../components/Products";
import { fetchProducts } from "@store/actions";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  // Access products, loading status, and error from the Redux store
  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <div className="hero">
        <div className="coverImage"></div>
        <h1 className="heading">LET’S SHOP</h1>
      </div>
      <h1 className="subheading">Products</h1>
      <div className="products">
        {loading && <h2>Loading products...</h2>}
        {products && products.length > 0 ? (
          <Products products={products} />
        ) : (
          <h2></h2>
        )}
      </div>
    </>
  );
}
