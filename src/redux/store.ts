import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import shoppingCartReducer from 'features/cart/pages/shoppingCartSlice';
import checkoutReducer from 'features/checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    checkout: checkoutReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
