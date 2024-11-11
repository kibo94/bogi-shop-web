"use client";
import { useContext, createContext, ReactNode, useState } from "react";
import { ProductModel } from "../../models/product";
import { useSession } from "next-auth/react";
import { useGlobal } from "./GlobalContext";

type productsContextType = {
  cart: ProductModel[];
  favorites: ProductModel[];
  addToCart: (product: ProductModel) => void;
  addToFavorites: (product: ProductModel) => void;
  removeFromFavorites: (id: String) => void;
};

const productContextDefaultValues: productsContextType = {
  cart: [],
  favorites: [],
  addToCart: () => {},
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
  const [favorites, setFavorites] = useState<ProductModel[]>([]);
  const { data: session }: any = useSession();
  const { openAlert } = useGlobal();

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
    removeFromFavorites: removeFromFavorites,
  };

  return (
    <>
      <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
    </>
  );
}
