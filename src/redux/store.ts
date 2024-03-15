import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import shoppingCartReducer from 'features/cart/pages/shoppingCartSlice';
import checkoutReducer from 'features/checkout/checkoutSlice';
import inputSearchReducer from 'features/product/pages/inputSearchSlice';
import productReducer from 'features/product/pages/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    checkout: checkoutReducer,
    shoppingCart: shoppingCartReducer,
    productList: productReducer,
    inputSearch: inputSearchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
