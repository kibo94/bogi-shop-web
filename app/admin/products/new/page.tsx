import ProductForm from "@app/admin/_components/CreateProductForm";
import React from "react";

function NewProduct() {
  return (
    <div className="mt-8">
      <ProductForm type="Create" />
    </div>
  );
}

export default NewProduct;
