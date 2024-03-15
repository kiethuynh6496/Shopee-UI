import { createSlice } from '@reduxjs/toolkit';

interface InputSearchState {
  input: string;
}

const initialState: InputSearchState = {
  input: '',
};

export const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState,
  reducers: {
    setInputSearch: (state, action) => {
      state.input = action.payload;
    },
  },
});

const inputSearchReducer = inputSearchSlice.reducer;
export default inputSearchReducer;

export const { setInputSearch } = inputSearchSlice.actions;
