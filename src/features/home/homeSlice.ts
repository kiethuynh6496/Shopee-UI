import { createSlice } from '@reduxjs/toolkit';
import { Currency } from 'models';

export interface HomeState {
  currency?: Currency;
  currencies?: Currency[];
}

const initialState: HomeState = {
  currency: undefined,
  currencies: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {},
});

// Actions
export const homeActions = homeSlice.actions;

// Selectors
export const selectHomeCurrency = (state: any) => state.home.currency;
export const selectHomeCurrencies = (state: any) => state.home.currenies;

// Reducer
const homeReducer = homeSlice.reducer;
export default homeReducer;
