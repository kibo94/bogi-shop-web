"use client";
import React, { useEffect } from "react";
import Products from "../../components/Products";
import { useSession } from "next-auth/react";
import useFetchData from "@hooks/useProducts";
import { useRouter } from "next/navigation";

function FavoritesPage() {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  // useEffect(() => {}, [session?.user.id]);

  // const { favorites } = useProduct();
  const [favorites, refetch] = useFetchData(
    `/api/user/${session?.user.id}/favorites`
  );

  if (status === "loading") {
    return <p>Loading session...</p>;
  }
  return (
    <div className="h-screen">
      {favorites.data.length > 0 ? (
        <Products isFavorites={true} products={favorites.data} />
      ) : (
        <h1>No favorites</h1>
      )}
    </div>
  );
}

export default FavoritesPage;
