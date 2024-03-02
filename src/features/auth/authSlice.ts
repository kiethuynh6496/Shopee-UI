import { createSlice } from '@reduxjs/toolkit';
import { User } from 'models';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: any) => state.auth.currentUser;
export const selectStates = (state: any) => state.auth;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
