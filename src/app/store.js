import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Import Redux Thunk middleware

import productReducer from '../features/product-list/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/orders/orderSlice';
import userReducer from '../features/userInfo/userSlice';
import adminReducer from '../features/adminPanel/adminSlice';
import NotificationReducer  from '../features/Alert/notificationSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    admin: adminReducer,
    notification: NotificationReducer
  },
  middleware: [thunk, ...getDefaultMiddleware()],
});

export const RootState = store.getState;