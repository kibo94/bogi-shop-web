import { FavoriteModel } from "@models/favorite"
import { ProductModel } from "@models/product"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isInFavorites( productId:String , favorites:FavoriteModel[]) 
{
    return  favorites.length > 0 ? favorites.find(favorite => favorite.product== productId) : false
}
