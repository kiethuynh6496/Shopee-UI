import { createSlice } from '@reduxjs/toolkit';
import { ProductResponse } from 'models/product/productInfo';

interface ProdcutState {
  productList: ProductResponse;
}

const initialState: ProdcutState = {
  productList: {
    statusCode: 0,
    massage: '',
    data: [],
  },
};

export const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
  },
});

const productReducer = productSlice.reducer;
export default productReducer;

export const { setProductList } = productSlice.actions;
