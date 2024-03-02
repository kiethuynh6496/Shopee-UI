import { createSlice } from '@reduxjs/toolkit';

export interface CheckoutState {
  isOpenAddressModal: boolean;
  isConfirmModal: boolean;
  updateAddressSelected: number | null;
  isModifyAddressStep: boolean;
  addressIdChecked: number | null;
}

const initialState: CheckoutState = {
  isOpenAddressModal: false,
  isConfirmModal: false,
  updateAddressSelected: null,
  isModifyAddressStep: false,
  addressIdChecked: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setIsOpenAddressModal(state, action) {
      state.isOpenAddressModal = action.payload;
    },
    setIsConfirmModal(state, action) {
      state.isConfirmModal = action.payload;
    },
    setUpdateAddressSelected(state, action) {
      state.updateAddressSelected = action.payload;
    },
    setisModifyAddressStep(state, action) {
      state.isModifyAddressStep = action.payload;
    },
    setAddressIdChecked(state, action) {
      state.addressIdChecked = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const checkoutActions = checkoutSlice.actions;

// Selectors
export const selectIsOpenAddressModal = (state: any) => state.checkout.isOpenAddressModal;
export const selectIsConfirmModal = (state: any) => state.checkout.isConfirmModal;
export const selectUpdateAddressSelected = (state: any) => state.checkout.updateAddressSelected;
export const selectIsModifyAddressStep = (state: any) => state.checkout.isModifyAddressStep;
export const selectAddressIdChecked = (state: any) => state.checkout.addressIdChecked;
export const selectCheckoutStates = (state: any) => state.checkout;

// Reducer
const checkoutReducer = checkoutSlice.reducer;
export default checkoutReducer;
