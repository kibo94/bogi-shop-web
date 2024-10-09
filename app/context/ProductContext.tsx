"use client";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { ProductModel } from "../../models/product";
import { useSession } from "next-auth/react";
import { FavoriteModel } from "@models/favorite";
import { useGlobal } from "./GlobalContext";

type productsContextType = {
  cart: ProductModel[];
  favorites: FavoriteModel[];
  addToCart: (product: ProductModel) => void;
  fetchProducts: () => void;
  addToFavorites: (product: ProductModel) => void;
  removeFromFavorites: (id: String) => void;
};

const productContextDefaultValues: productsContextType = {
  cart: [],
  favorites: [],
  addToCart: () => {},
  fetchProducts: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
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
  const [favorites, setFavorites] = useState<FavoriteModel[]>([]);
  const { data: session }: any = useSession();
  const { openAlert } = useGlobal();

  useEffect(() => {
    // fetchFavorites();
  }, [session?.user.id]);
  async function fetchFavorites() {
    if (session?.user.id) {
      try {
        const response = await fetch(`/api/user/${session?.user.id}/favorites`);
        const favorites = await response.json();
        setFavorites(favorites);
      } catch (error: any) {
        openAlert(error.message);
      }
    }
  }

  async function removeFromFavorites(id: String) {
    try {
      const response = await fetch(`/api/user/${id}/favorites`, {
        method: "DELETE",
        body: JSON.stringify({
          creator: session?.user.id,
          favoriteId: id,
        }),
      });
      const favorites = await response.json();
      setFavorites(favorites);
      openAlert("Product has been removed to the favorites");
    } catch (error: any) {
      openAlert(error.message);
    }
  }
  function fetchProducts() {
    // fetchApiProducts();
  }
  function addToCartHandler(product: ProductModel) {
    setCart([...cart, product]);
  }
  async function addToFavoritesHandler(product: ProductModel) {
    const { price, onStack, rating, details, _id, name, productImageUrl } =
      product;
    try {
      const response = await fetch("api/favorite/new", {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          onStack,
          rating,
          details,
          productImageUrl,
          creator: session?.user,
          product: _id,
        }),
      });
      const favorites = await response.json();
      setFavorites(favorites);
      openAlert("Product has been added to the favorites");
    } catch (error: any) {
      openAlert(error.message);
    }
  }
  const value = {
    cart: cart,
    favorites: favorites,
    addToCart: addToCartHandler,
    addToFavorites: addToFavoritesHandler,
    fetchFavorites: fetchFavorites,
    removeFromFavorites: removeFromFavorites,
    fetchProducts: fetchProducts,
  };

  return (
    <>
      <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
    </>
  );
}
