"use client";
import productImg from "../public/assets/images/product-img.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProduct } from "../app/context/ProductContext";
import { useSession } from "next-auth/react";
import ProductDropDown from "@app/admin/_components/ProductDropDown";
import { isInFavorites } from "@lib/utils";
import { ProductModel } from "@models/product";
interface ProductInterface {
  product: ProductModel;
  isAdmin: boolean;
  isFavorites: boolean;
}
const Product = (props: ProductInterface) => {
  const router = useRouter();
  const { addToCart, removeFromFavorites, favorites, addToFavorites } =
    useProduct();

  const { productImageUrl, _id } = props.product;
  const { data: session }: any = useSession();
  function productDetails(id: any) {
    router.push(`/products/${id}`, {});
  }
  console.log(productImageUrl);

  return (
    <div className="product relative">
      <div
        onClick={() => productDetails(props.product["_id"])}
        className="overlay absolute w-full h-full z-2 left-0 top-0"
      ></div>
      <div className="flex justify-between">
        {props.isFavorites ? (
          <svg
            className="z-10 relative"
            onClick={() => removeFromFavorites(_id)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
              fill="black"
            />
          </svg>
        ) : (
          <>
            {isInFavorites(_id, favorites) ? (
              <svg
                onClick={() => {
                  removeFromFavorites(
                    favorites.find(
                      (favorite) =>
                        favorite.product == props.product._id &&
                        favorite.creator == session?.user.id
                    )?._id!
                  );
                }}
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
            ) : (
              <svg
                onClick={async () => {
                  addToFavorites(props.product);
                }}
                className="z-10 relative"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.377 17.3849L19.7786 25.5487C20.0686 25.8299 20.2136 25.9712 20.3827 26.0062C20.4597 26.0219 20.539 26.0219 20.616 26.0062C20.7875 25.9712 20.9313 25.8312 21.2201 25.5487L29.6217 17.3862C30.7628 16.2778 31.4632 14.7689 31.5859 13.1546C31.7086 11.5403 31.2447 9.93669 30.285 8.65744L29.9105 8.15869C27.5325 4.98869 22.7595 5.51994 21.0884 9.14244C21.0352 9.25724 20.9518 9.35415 20.8477 9.42198C20.7435 9.48982 20.623 9.52581 20.5 9.52581C20.3769 9.52581 20.2564 9.48982 20.1522 9.42198C20.0481 9.35415 19.9647 9.25724 19.9115 9.14244C18.2404 5.51994 13.4675 4.98744 11.0895 8.15869L10.7149 8.65869C9.75588 9.93776 9.29244 11.5408 9.41511 13.1545C9.53779 14.7683 10.2378 16.2767 11.3782 17.3849H11.377Z"
                  stroke="black"
                />
              </svg>
            )}
          </>
        )}

        {props.isAdmin && <ProductDropDown id={props.product["_id"]} />}
      </div>

      <Image
        className="prd-image"
        src={productImageUrl}
        alt="product-img"
        width={200}
        height={200}
      />
      <p className="productName mt-3">{props.product.name}</p>
      <div className="product-footer">
        <div className="price">{props.product.price} din</div>
        <svg
          className="relative z-10"
          onClick={() => addToCart(props.product)}
          width="38"
          height="31"
          viewBox="0 0 38 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0153 3.98377L10.1025 4.375H10.5033H36.416C37.1644 4.375 37.6085 4.98928 37.4746 5.52998L34.3559 18.1237C34.2537 18.5367 33.8342 18.875 33.2973 18.875H13.9579H13.3342L13.4699 19.4838L13.9016 21.4213L13.9888 21.8125H14.3897H32.0978C32.8462 21.8125 33.2903 22.4268 33.1564 22.9675L32.7924 24.4373L32.6918 24.8438L33.0743 25.0142C34.1512 25.494 34.8611 26.4896 34.8611 27.6094C34.8611 29.1663 33.4722 30.5 31.6667 30.5C29.8612 30.5 28.4722 29.1663 28.4722 27.6094C28.4722 26.8155 28.827 26.0892 29.4164 25.5593L30.386 24.6875H29.0821H15.2512H13.9472L14.9169 25.5593C15.5063 26.0892 15.8611 26.8155 15.8611 27.6094C15.8611 29.1663 14.4722 30.5 12.6667 30.5C10.8612 30.5 9.47222 29.1663 9.47222 27.6094C9.47222 26.5596 10.0955 25.6209 11.0615 25.1111L11.3992 24.9329L11.3161 24.5601L6.6817 3.76623L6.5945 3.375H6.19367H1.58333C0.943756 3.375 0.5 2.90875 0.5 2.42188V1.45312C0.5 0.966245 0.943756 0.5 1.58333 0.5H8.3474C8.89399 0.5 9.31683 0.849899 9.41057 1.27064L9.41058 1.27067L10.0153 3.98377Z"
            stroke="#283EB0"
          />
        </svg>
      </div>
    </div>
  );
};

export default Product;
