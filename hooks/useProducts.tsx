import { useGlobal } from "@app/context/GlobalContext";
import { ProductModel } from "@models/product";
import { ProductState } from "@models/products-state";
import { useState, useEffect } from "react";

// Define your product model based on the structure of your product data

// Define the return type of the hook

const useFetchData = (url: string): [ProductState, React.Dispatch<void>] => {
  const [products, setProducts] = useState<ProductState>({
    loading: false,
    data: [],
    error: null,
  });
  const { openAlert } = useGlobal();

  // Fetch products data
  async function fetchProducts() {
    setProducts({ loading: true, data: [], error: null });
    try {
      const response = await fetch(url); // Fetch from the custom URL
      const products: ProductModel[] = await response.json();
      console.log(products);
      setProducts({ loading: false, data: products, error: null });
    } catch (err: any) {
      setProducts({
        loading: false,
        data: [],
        error: err.message,
      });
      openAlert(err.message);
    }
  }

  // Fetch the products on the initial render or when the URL changes
  useEffect(() => {
    if (url) {
      fetchProducts();
    }
  }, [url]); // Dependency on the URL so it fetches when URL changes

  // Return both the state and the setter function
  return [products, fetchProducts];
};

export default useFetchData;
