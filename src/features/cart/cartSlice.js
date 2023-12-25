import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteCartProduct, fetchCartProductsByUserId, updateCartProductQuantity } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
  statusQty: 'idle',
  cartLoaded: false,
  error:null
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const updateCartProductQuantityAsync = createAsyncThunk(
  'cart/updateCartProductQuantity',
  async (update) => {
    const response = await updateCartProductQuantity(update);
    return response.data;
  }
);
export const fetchCartProductsByUserIdAsync = createAsyncThunk(
  'cart/fetchCartProductsByUserId',
  async (userId) => {
    const response = await fetchCartProductsByUserId(userId);
    return response.data;
  }
);

export const deleteCartProductAsync = createAsyncThunk(
  'cart/deleteCartProduct',
  async (itemId) => {
    const response = await deleteCartProduct(itemId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
        })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.error)
      })
      .addCase(fetchCartProductsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartProductsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(updateCartProductQuantityAsync.pending, (state) => {
        state.statusQty = 'loading';
      })
      .addCase(updateCartProductQuantityAsync.fulfilled, (state, action) => {
        state.statusQty = 'idle';
        const Index = state.items.findIndex(item => item.id === action.payload.id);
        state.items[Index] = action.payload;
      })
      .addCase(deleteCartProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const Index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(Index, 1);
      })
  },
});

export const cartItems = (state) => state.cart.items
// export const { } = cartSlice.actions;



export default cartSlice.reducer;
