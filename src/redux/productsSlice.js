import { createSlice } from "@reduxjs/toolkit";
import merge from "lodash/merge";

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsData: (state, action) => {
      state.products = action.payload;
    },
    setText: (state, action) => {
      state.products = action.payload;
    },
    saveItem: (state, action) => {},

    deleteItem: (state, action) => {
      console.log("deleteItem", action.payload);
    },
    addNewItem: (state, action) => {},
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setProducts: (state, action) => {},
  },
});

export const {
  setNormalisedData,
  setProductsData,
  deleteItem,
  setText,
  setPrices,
  setProducts,
  saveItem,
} = productsSlice.actions;
export default productsSlice.reducer;
