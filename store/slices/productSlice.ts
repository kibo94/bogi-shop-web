import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions';
import { RootState } from '@store/store';
import { ProductModel } from '@models/product';

interface ProductState {
  items: ProductModel[];
  loading:boolean
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading:false,

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
      });
  },
});
export const selectLoading = (state: RootState) => state.product.loading;
export const selectError = (state: RootState) => state.product.error;
export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
