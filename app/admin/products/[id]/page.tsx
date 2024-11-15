"use client";
import ProductForm from "@app/admin/_components/CreateProductForm";
import { ProductModel } from "@models/product";
import { fetchProduct } from "@store/actions";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditProduct() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { id } = params;
  const { product } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);
  return (
    <div className="mt-8">
      {product && <ProductForm isEdit={true} type="Edit" product={product} />}
    </div>
  );
}

export default EditProduct;
