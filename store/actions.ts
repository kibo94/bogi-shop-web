import { ProductModel } from '@models/product';
import { createAsyncThunk } from '@reduxjs/toolkit';
interface FetchConfig {
  method?: string;
  body?: string;
}

// Fetch products
export const fetchProduct = createAsyncThunk<ProductModel, String | String[] , { rejectValue: string }>(
  'product/fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/products/${id}`);

      
      if (!response.ok) {
        // If response is not OK, throw an error
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const product:ProductModel = await response.json();
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

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

export const updateProducts = createAsyncThunk<
  ProductModel, // Return type
  FetchConfig | undefined, // Argument type
  { rejectValue: string } // Reject value type
>(
  'product/updateProducts',
  async (config, { rejectWithValue }) => {
    try {
      // Use config or fallback to default fetch options
      const response = await fetch('/api/products', {
        method: config?.method, // Default to GET if no config is provided
        ...config, // Spread the provided config to override defaults
      });

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data: ProductModel = await response.json();

      // Debugging step: Log the data
      console.log('Fetched products:', data);

      return data;
    } catch (error: any) {
      // Debugging step: Log the error
      console.error('Error fetching products:', error);

      // Return the error message
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
);
export const addToProducts = createAsyncThunk<
  ProductModel[], // Return type
  FetchConfig | undefined, // Argument type
  { rejectValue: string } // Reject value type
>(
  'product/addToProducts',
  async (config, { rejectWithValue }) => {
    try {
      // Use config or fallback to default fetch options
      const response = await fetch('/api/products', {
        method: config?.method, // Default to GET if no config is provided
        ...config, // Spread the provided config to override defaults
      });

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data: ProductModel[] = await response.json();

      // Debugging step: Log the data
      console.log('Fetched products:', data);

      return data;
    } catch (error: any) {
      // Debugging step: Log the error
      console.error('Error fetching products:', error);

      // Return the error message
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
);



export const deleteProduct = createAsyncThunk<
  ProductModel[], // Return type
  String , // Argument type
  { rejectValue: string } // Reject value type
>(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      // Use config or fallback to default fetch options
  var response =  await fetch("/api/products", {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      });
      

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }

      // Parse the JSON response
      const data: ProductModel[] = await response.json();

      // Debugging step: Log the data
      console.log('Fetched products:', data);

      return data;
    } catch (error: any) {
      // Debugging step: Log the error
      console.error('Error fetching products:', error);

      // Return the error message
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
);







