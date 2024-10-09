import React from "react";
import Product from "./Product";
import { ProductModel } from "../models/product";
interface ProductsProps {
  products: ProductModel[];
  isFavorites?: boolean;
  isAdmin?: boolean;
  deleteProduct?: () => void;
}
function Products({
  products,
  isFavorites = false,
  isAdmin = false,
  deleteProduct = () => {},
}: ProductsProps) {
  return (
    <div className="products mt-10">
      {products.map((product: ProductModel) => (
        <Product
          product={product}
          key={product._id}
          isFavorites={isFavorites}
          isAdmin={isAdmin}
          deleteProduct={deleteProduct}
        />
      ))}
    </div>
  );
}

export default Products;
