import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUser, fetchUserInfo } from './userAPI';

const initialState = {
  userInfo: null,
  status: 'idle',
  error:null
};

export const fetchUserInfoAsync = createAsyncThunk(
  'user/fetchUserInfo',
  async (token) => {
    const response = await fetchUserInfo(token);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (userData) => {
    const response = await updateUser(userData);
    return response.data;
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
  },
});

export const UserInfo = (state) => state.auth.userInfo

export default userSlice.reducer;
