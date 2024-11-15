"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import productImg from "../../../public/assets/images/product-img.png";
import Image from "next/image";
import ProductRating from "@/components/Rating";
import Comment from "@/components/Comment";
import { useProduct } from "@app/context/ProductContext";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { fetchProduct, fetchProducts } from "@store/actions";

function SingleProduct() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { addToCart } = useProduct();
  const { id } = params;
  const [comments, setComments] = useState([]);
  const { product } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct(id));
    const fetchPosts = async () => {
      const response = await fetch(`/api/products/${id}/comments`);
      const data = await response.json();
      setComments(data);
    };
    fetchPosts();
  }, [id]);

  return (
    <div className="mt-20 singleProduct">
      <div className="flex flex-row gap-16 items-start">
        <Image
          src={
            product?.productImageUrl != null
              ? product?.productImageUrl
              : productImg
          }
          alt="product-img"
          width={500}
          height={200}
        />
        <div>
          <div className="flex row items-center gap-4">
            <h2 className="text-2xl">{product?.name}</h2>
            <div className="flex items-center">
              <div className="product-status"></div>
              <p className="m-0 text-xl">On stack</p>
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            <ProductRating rating={product?.rating} />

            <span className="ms-4">{product?.rating} / 5</span>
          </div>
          <div className="add-impression flex mt-4">
            <span> Add impression</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87005 6.4 7.85005 10.07 9.07005 13.22C9.11005 13.32 9.15005 13.42 9.15005 13.55C9.15005 13.77 9.00005 13.97 8.80005 14.05C8.57005 14.15 8.33005 14.09 8.14005 13.93C8.08329 13.8825 8.03583 13.8248 8.00005 13.76C6.87005 12.33 6.69005 10.28 7.45005 8.64C5.78005 10 4.87005 12.3 5.00005 14.47C5.06005 14.97 5.12005 15.47 5.29005 15.97C5.43005 16.57 5.70005 17.17 6.00005 17.7C7.08005 19.43 8.95005 20.67 10.96 20.92C13.1 21.19 15.3901 20.8 17.0301 19.32C18.8601 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2ZM14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5Z"
                fill="#283EB0"
              />
            </svg>
          </div>
          <div className="mt-4 mb-2">
            <h2 className="text-3xl">{product?.price} din</h2>
          </div>
          <button
            className="inline-flex gap-2 button items-center"
            onClick={() => addToCart(product!)}
          >
            <span>Add to cart</span>
            <svg
              width="18"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0222 7.51599L16.0222 7.51601C16.0215 7.51862 16.0131 7.54328 15.9682 7.57238C15.9236 7.6013 15.8555 7.625 15.7724 7.625H6.61163H5.97016L6.12675 8.24706L6.33128 9.05956L6.42642 9.4375H6.81616H15.2042C15.3216 9.4375 15.399 9.48184 15.4337 9.51712C15.4488 9.53249 15.4533 9.5432 15.4543 9.54609C15.4543 9.54641 15.4542 9.54679 15.454 9.54724L15.2816 10.1636L15.1602 10.598L15.5797 10.7634C16.0272 10.9399 16.25 11.2733 16.25 11.5781C16.25 11.9953 15.7924 12.5 15 12.5C14.2076 12.5 13.75 11.9953 13.75 11.5781C13.75 11.3589 13.8597 11.1347 14.0871 10.9537L15.2067 10.0625H13.7757H7.22425H5.79313L6.91288 10.9537C7.14032 11.1347 7.25 11.3589 7.25 11.5781C7.25 11.9953 6.79238 12.5 6 12.5C5.20762 12.5 4.75 11.9953 4.75 11.5781C4.75 11.2917 4.94453 10.9832 5.34076 10.798L5.71474 10.6233L5.61397 10.223L3.41872 1.50293L3.32357 1.125H2.93384H0.75C0.650444 1.125 0.576069 1.09186 0.534964 1.05846C0.515036 1.04227 0.505952 1.02869 0.502444 1.02195C0.500733 1.01866 0.500217 1.0168 0.500097 1.01633L0.5 1.01562V0.609375L0.500097 0.608674C0.500217 0.608198 0.500733 0.606336 0.502444 0.60305C0.505952 0.596312 0.515036 0.582729 0.534964 0.566537C0.576069 0.533139 0.650444 0.5 0.75 0.5H3.95403C4.03868 0.5 4.10753 0.524536 4.15194 0.553985C4.19657 0.583582 4.20358 0.607867 4.20394 0.609283L4.20394 0.609316L4.49038 1.74707L4.58553 2.125H4.97525H17.2497C17.367 2.125 17.4445 2.16934 17.4792 2.20462C17.4943 2.21999 17.4988 2.23071 17.4998 2.23359C17.4997 2.23391 17.4996 2.23428 17.4995 2.23474L16.0222 7.51599Z"
                stroke="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-xl mb-2">Description</h3>
        <p className="m-0">{product?.details}</p>
      </div>
      <div className="mt-8">
        <h3 className="text-xl mb-2">Comments</h3>
        <div className="flex gap-10">
          {comments.length > 0 &&
            comments.map((cmt: any, index) => (
              <Comment
                key={index}
                desc={cmt.comment}
                email={cmt.creator.setComments}
                rating={cmt.rating}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
