import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  normalisedState: {},
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setNormalisedData: (state, action) => {
      state.normalisedState = action.payload;
    },
    setProductsData: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setNormalisedData, setProductsData } = productsSlice.actions;
export default productsSlice.reducer;
