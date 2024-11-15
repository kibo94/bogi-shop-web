"use client";
import React, { useEffect } from "react";
import Products from "../../components/Products";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { fetchProducts } from "@store/actions";
function ProductsPage() {
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
      {loading && <h2>Loading products...</h2>}
      {products && products.length > 0 ? (
        <Products products={products} />
      ) : (
        <h2></h2>
      )}
    </>
  );
}

export default ProductsPage;
