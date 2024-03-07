import { createSlice } from '@reduxjs/toolkit';
import { ShoppingCartInfo } from 'models/shoppingCart/shoppingCartInfo';

interface ShoppingCartState {
  shoppingCart: ShoppingCartInfo;
}

const initialState: ShoppingCartState = {
  shoppingCart: {
    id: 0,
    userId: '',
    shoppingCartItems: [],
  },
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.shoppingCart?.shoppingCartItems.findIndex(
        (i) => i.itemId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.shoppingCart!.shoppingCartItems[itemIndex].quantity -= quantity;
      if (state.shoppingCart?.shoppingCartItems[itemIndex].quantity === 0)
        state.shoppingCart.shoppingCartItems.splice(itemIndex, 1);
    },
  },
});

const shoppingCartReducer = shoppingCartSlice.reducer;
export default shoppingCartReducer;

export const { setShoppingCart, removeItem } = shoppingCartSlice.actions;
