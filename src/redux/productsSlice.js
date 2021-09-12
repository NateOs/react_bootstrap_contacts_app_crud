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
    deleteItem: (state, action) => {
      if (state.normalisedState.products.id === action.payload) {
        Object.assign(state.normalisedState.products, {
          name: "",
        });
      }
    },
  },
});

export const { setNormalisedData, setProductsData, deleteItem } =
  productsSlice.actions;
export default productsSlice.reducer;
