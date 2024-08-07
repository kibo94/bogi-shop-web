import React from "react";
import { ProductModel } from "../models/product";
import Products from "../components/Products";
var apiUrl = "http://localhost:4000";
async function ProductsPage() {
  const res = await fetch(`${apiUrl}/products`);
  const products: ProductModel[] = await res.json();
  return (
    <div className="products">
      <Products products={products} />
    </div>
  );
}

export default ProductsPage;
