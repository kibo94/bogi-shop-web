import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToProducts, deleteProduct, fetchProduct, fetchProducts, updateProducts } from '../actions';
import { RootState } from '@store/store';
import { ProductModel } from '@models/product';

interface ProductState {
  items: ProductModel[];
  product?:ProductModel | null,
  loading:boolean
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading:false,
  product:null,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductModel>) {
      state.items.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductModel[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })   .addCase(updateProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(updateProducts.fulfilled, (state, action: PayloadAction<ProductModel>) => {
  
        state.loading = false;
        state.items = [] // Update items with the fetched products
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update products'; // Set the error message
      })
      .addCase(addToProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(addToProducts.fulfilled, (state, action: PayloadAction<ProductModel[]>) => {
        state.loading = false;
        state.items = action.payload
      })
      .addCase(addToProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update products'; // Set the error message
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<ProductModel[]>) => {
        state.loading = false;
        state.items = action.payload
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update products'; // Set the error message
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<ProductModel>) => {
        state.loading = false;
        state.product = action.payload
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update products'; // Set the error message
      });
      
      
  },
});
export const selectLoading = (state: RootState) => state.product.loading;
export const selectError = (state: RootState) => state.product.error;
export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
