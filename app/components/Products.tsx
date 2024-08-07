import React from "react";
import Product from "./Product";
import { ProductModel } from "../models/product";
interface ProductsProps {
  products: ProductModel[];
}
function Products({ products }: ProductsProps) {
  return (
    <div className="products">
      {products.map((product: ProductModel) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}

export default Products;
