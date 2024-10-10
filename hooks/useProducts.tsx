import { useGlobal } from "@app/context/GlobalContext";
import { ProductModel } from "@models/product";
import { ProductState } from "@models/products-state";
import { useState, useEffect, useCallback } from "react";

const cache: any = {};

const useFetchData = (url: string): [ProductState, () => void] => {
  const [products, setProducts] = useState<ProductState>({
    loading: false,
    data: [],
    error: null,
  });
  const { openAlert } = useGlobal();

  // Function to fetch products data, with optional forceRefresh
  const fetchProducts = async (forceRefresh = false) => {
    if (!forceRefresh && cache[url]) {
      setProducts({ loading: false, data: cache[url], error: null });
      return;
    }

    setProducts({ loading: true, data: [], error: null });

    try {
      const response = await fetch(url); // Fetch from the custom URL
      const productsData: ProductModel[] = await response.json();
      cache[url] = productsData; // Update the cache
      setProducts({ loading: false, data: productsData, error: null });
    } catch (err: any) {
      setProducts({
        loading: false,
        data: [],
        error: err.message,
      });
      openAlert(err.message);
    }
  };

  // Refetch function that forces fresh data by invalidating cache
  const refetch = useCallback(() => {
    fetchProducts(true); // Pass `true` to bypass cache and refetch data
  }, [url]);

  // Fetch the products on the initial render or when the URL changes
  useEffect(() => {
    if (url) {
      if (cache[url]) {
        // If cache exists, update the state immediately with cached data
        setProducts({ loading: false, data: cache[url], error: null });
      } else {
        // If no cache, fetch from the API
        fetchProducts();
      }
    }
  }, [url]); // Dependency on the URL so it fetches when URL changes

  // Return both the state and the refetch function
  return [products, refetch];
};

export default useFetchData;
