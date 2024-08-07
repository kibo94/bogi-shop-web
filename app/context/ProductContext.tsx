"use client";
import { useContext, createContext, ReactNode, useState } from "react";
import { ProductModel } from "../models/product";
import { axiosInstance } from "../utilis/api";
interface Alert {
  message: String;
  show: boolean;
}
type productsContextType = {
  cart: ProductModel[];
  favorites: ProductModel[];
  alert: Alert;
  addToCart: (product: ProductModel) => void;
  addToFavorites: (product: ProductModel) => void;
  openAlert: (message: String) => void;
  fetchProducts: () => void;
};

const productContextDefaultValues: productsContextType = {
  cart: [],
  favorites: [],
  alert: { message: "", show: false },
  addToCart: () => {},
  addToFavorites: () => {},
  openAlert: () => {},
  fetchProducts: () => {},
};

const ProductContext = createContext<productsContextType>(
  productContextDefaultValues
);

export function useProduct() {
  return useContext(ProductContext);
}

type Props = {
  children: ReactNode;
};
export function ProductProvider({ children }: Props) {
  const [alert, setAlert] = useState<Alert>({ message: "", show: false });
  const [cart, setCart] = useState<ProductModel[]>([]);
  const [favorites, setFavorites] = useState<ProductModel[]>([]);

  function openAlert(message: String) {
    setAlert({ message, show: true });
    setTimeout(() => setAlert({ ...alert, show: false }), 1000);
  }
  function addToCartHandler(product: ProductModel) {
    setCart([...cart, product]);
    openAlert("Product has been added to the cart");
  }
  function addToFavoritesHandler(product: ProductModel) {
    setFavorites([...favorites, product]);
    openAlert("Product has been added to the favorites");
  }
  const value = {
    cart: cart,
    favorites: favorites,
    alert: alert,
    addToCart: addToCartHandler,
    addToFavorites: addToFavoritesHandler,
    openAlert,
    fetchProducts,
  };

  async function fetchProducts() {
    try {
      var res = await axiosInstance.get("products");
    } catch (error) {}
  }
  return (
    <>
      <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
    </>
  );
}
