import { ProductModel } from "./product";

export interface ProductState {
    loading: boolean;
    data: any;
    error: string | null;
  }