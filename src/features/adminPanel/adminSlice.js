import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProduct, updateProduct } from './adminAPI';

const initialState = {
  status: 'idle',
  error:null
};

export const addProductAsync = createAsyncThunk(
  'admin/addProduct',
  async (productData) => {
    const response = await addProduct(productData);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'admin/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);


export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
  },
});


// export const { setFormState } = adminSlice.actions;

export default adminSlice.reducer;
