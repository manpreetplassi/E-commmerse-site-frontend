import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, fetchOrderByUserId, removeOrders, updateOrder } from './orderAPI';


const initialState = {
  orders: [],
  totalOrders: 0,
  usersOrders: [],
  status: 'idle',
  currentOrder: null,
  error:null,
  orderMsg: null,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const removeOrdersAsync = createAsyncThunk(
  'order/removeOrders',
  async (orderId) => {
    const response = await removeOrders(orderId);
    return response.data;
  }
);
export const fetchOrderByUserIdAsync = createAsyncThunk(
  'order/fetchOrderByUserId',
  async () => {
    const response = await fetchOrderByUserId();
    return response.data;
  }
);
export const fetchAllOrderAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCurrentOrder: (state)=>{
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload)
        state.currentOrder = action.payload
      })
      .addCase(fetchOrderByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.usersOrders = action.payload
        state.orderMsg = "order is fetched successfully";
      })
      .addCase(removeOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orderMsg = action.payload;
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const Index = state.orders.findIndex(item => item.id === action.payload.id);
        state.orders[Index] = action.payload;
      })
}});

export const { resetCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
