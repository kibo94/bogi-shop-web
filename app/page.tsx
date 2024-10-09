"use client";
import Products from "../components/Products";
import useFetchData from "@hooks/useProducts";

export default function Home() {
  const [products] = useFetchData("/api/products");
  return (
    <>
      <div className="hero">
        <div className="coverImage"></div>
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
