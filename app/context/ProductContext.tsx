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
interface ProductState {
  loading: boolean;
  data: ProductModel[];
  error: string | null;
}

type productsContextType = {
  cart: ProductModel[];
  favorites: FavoriteModel[];
  products: ProductState;
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
  products: { data: [], error: null, loading: false },
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
  const [products, setProducts] = useState<ProductState>({
    loading: false,
    data: [],
    error: null,
  });
  const { openAlert } = useGlobal();
  useEffect(() => {
    const fetchProducts = async () => {
      setProducts({ loading: true, data: [], error: null });
      try {
        const response = await fetch(`/api/products`);
        const products: ProductModel[] = await response.json();
        setProducts({ loading: false, data: products, error: null });
      } catch (err: any) {
        openAlert(err.message);
        setProducts({
          loading: false,
          data: [],
          error: err.message,
        });
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [session?.user.id]);
  async function fetchFavorites() {
    if (session?.user.id) {
      const response = await fetch(`/api/user/${session?.user.id}/favorites`);
      const favorites = await response.json();
      setFavorites(favorites);
    }
  }

  async function removeFromFavorites(id: String) {
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
  }

  function addToCartHandler(product: ProductModel) {
    setCart([...cart, product]);
  }
  async function addToFavoritesHandler(product: ProductModel) {
    const { price, onStack, rating, details, _id, name, productImageUrl } =
      product;
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
    console.log(favorites);
    setFavorites(favorites);
    openAlert("Product has been added to the favorites");
  }
  const value = {
    cart: cart,
    favorites: favorites,
    addToCart: addToCartHandler,
    addToFavorites: addToFavoritesHandler,
    fetchFavorites: fetchFavorites,
    removeFromFavorites: removeFromFavorites,
    products: products,
  };

  return (
    <>
      <ProductContext.Provider value={value}>
        {children}
      </ProductContext.Provider>
    </>
  );
}
