import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchFilterData, fetchProductById, fetchProductsByFilter } from './productAPI';

const initialState = {
  products: [],
  productDetails: null,
  filters: [],
  status: 'idle',
  totalItems: 0,
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({filter ,sort ,pagination }) => {
    const response = await fetchProductsByFilter(filter , sort, pagination);
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchFilterDataAsync = createAsyncThunk(
  'product/fetchFilterData',
  async () => {
    const response = await fetchFilterData();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productDetails = action.payload;
      })
       //fiterData
      .addCase(fetchFilterDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilterDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.filters = action.payload;
      })
  },
});

// export const { } = productSlice.actions;
export const productDetails = state => state.products.productDetails;



export default productSlice.reducer;
