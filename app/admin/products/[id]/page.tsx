"use client";
import ProductForm from "@app/admin/_components/CreateProductForm";
import { ProductModel } from "@models/product";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditProduct() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<ProductModel>();
  useEffect(() => {
    const fetchProduct = async () => {
      const res2 = await fetch(`/api/products/${id}`);
      const product = await res2.json();
      setProduct(product);
    };
    fetchProduct();
  }, [id]);
  return (
    <div className="mt-8">
      {product && <ProductForm isEdit={true} type="Edit" product={product} />}
    </div>
  );
}

export default EditProduct;
