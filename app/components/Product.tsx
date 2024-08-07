"use client";
import productImg from "../../public/assets/images/product-img.png";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { useRouter } from "next/navigation";
import { useProduct } from "../context/ProductContext";

const Product = (props: any) => {
  const router = useRouter();
  const { addToFavorites } = useProduct();

  function details(id: any) {
    router.push(`/products/${id}`, {});
  }
  return (
    <div className="product relative">
      <div
        onClick={details}
        className="overlay absolute w-full h-full z-2 left-0 top-0"
      ></div>
      <svg
        onClick={() => addToFavorites(props.product)}
        className="z-10 relative mb-2 relative right-4`"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.0001 33.25L16.7042 31.1916C14.039 28.7902 11.8355 26.7187 10.0938 24.977C8.35216 23.2354 6.96675 21.6716 5.93758 20.2856C4.90841 18.8997 4.18958 17.6267 3.78108 16.4666C3.37258 15.3066 3.1678 14.1191 3.16675 12.9041C3.16675 10.4236 3.998 8.35205 5.6605 6.68955C7.323 5.02705 9.39453 4.1958 11.8751 4.1958C13.2473 4.1958 14.5536 4.48608 15.7938 5.06663C17.0341 5.64719 18.1029 6.46524 19.0001 7.5208C19.8973 6.46524 20.9661 5.64719 22.2063 5.06663C23.4466 4.48608 24.7529 4.1958 26.1251 4.1958C28.6056 4.1958 30.6772 5.02705 32.3397 6.68955C34.0022 8.35205 34.8334 10.4236 34.8334 12.9041C34.8334 14.118 34.6292 15.3055 34.2207 16.4666C33.8122 17.6277 33.0928 18.9007 32.0626 20.2856C31.0324 21.6705 29.6469 23.2343 27.9063 24.977C26.1657 26.7198 23.9622 28.7913 21.2959 31.1916L19.0001 33.25Z"
          fill="black"
        />
      </svg>

      <Image src={productImg} alt="product-img" />
      <p className="productName">{props.product.name}</p>
      <div className="product-footer">
        <div className="price">{props.product.price} $</div>
        <AddToCart product={props.product} />
      </div>
    </div>
  );
};

export default Product;
