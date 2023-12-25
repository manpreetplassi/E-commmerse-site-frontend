import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, logInUser, signOut , checkAuth} from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null,
  checkAuth: false,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async ({userData}) => {
      const response = await createUser(userData);
      return response.data;
  }
);
export const logInUserAsync = createAsyncThunk(
  'auth/logInUser',
  async ({logInfo}, { rejectWithValue }) => {
  try {
      const response = await logInUser(logInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk('auth/checkAuth', async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async () => {
    const response = await signOut();
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'loggedIn';
        // state.error = action.payload.errors
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload
      })
      .addCase(logInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        state.status = 'loggedIn';
      })
      .addCase(logInUserAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.checkAuth = false;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.checkAuth = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.checkAuth = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
  },
});

// export const { } = authSlice.actions;


export default authSlice.reducer;
