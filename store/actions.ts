import { ProductModel } from '@models/product';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Fetch products
export const fetchProducts = createAsyncThunk<ProductModel[], void, { rejectValue: string }>(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        // If response is not OK, throw an error
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);
