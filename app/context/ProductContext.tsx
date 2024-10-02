"use client";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { ProductModel } from "../../models/product";
import { axiosInstance } from "../../utilis/api";
import { useSession } from "next-auth/react";
interface Alert {
  message: String;
  show: boolean;
}
type productsContextType = {
  cart: ProductModel[];
  favorites: ProductModel[];
  addToCart: (product: ProductModel) => void;
  addToFavorites: (product: ProductModel) => void;
};

const productContextDefaultValues: productsContextType = {
  cart: [],
  favorites: [],
  addToCart: () => {},
  addToFavorites: () => {},
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
  const [cart, setCart] = useState<ProductModel[]>([]);
  const [favorites, setFavorites] = useState<ProductModel[]>([]);
  const { data: session }: any = useSession();
  useEffect(() => {
    async function fetchFavorites() {
      const response = await fetch(`/api/user/${session?.user.id}/favorites`);
      const favorites = await response.json();
      setFavorites(favorites);
    }
    fetchFavorites();
  }, [session?.user.id]);

  function addToCartHandler(product: ProductModel) {
    setCart([...cart, product]);
  }
  function addToFavoritesHandler(product: ProductModel) {
    // setFavorites([...favorites, product]);
    // openAlert("Product has been added to the favorites");
  }
  const value = {
    cart: cart,
    favorites: favorites,
    addToCart: addToCartHandler,
    addToFavorites: addToFavoritesHandler,
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
