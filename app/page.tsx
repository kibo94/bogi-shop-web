import Products from "./components/Products";
import { ProductModel } from "./models/product";
import { axiosInstance } from "./utilis/api";

export default async function Home() {
  let products: ProductModel[] = [];
  try {
    const res = await axiosInstance.get("products");
    products = await res.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className="hero">
        <h1 className="heading">LET’S SHOP</h1>
      </div>
      <h1 className="subheading">Products</h1>
      <div className="products">
        <Products products={products} />
      </div>
    </>
  );
}
