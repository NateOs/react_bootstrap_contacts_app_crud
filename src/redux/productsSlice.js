import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  normalisedState: {},
  prices: {},
  nProducts: {},
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
    setText: (state, action) => {
      state.products = action.payload;
    },
    saveItem: (state, action) => {
      const newProduct = {
        id: action.payload.id,
        name: action.payload.name,
        // prices: action.payload.price,
      };

      Object.assign(state.nProducts, newProduct);
    },

    deleteItem: (state, action) => {
      console.log("deleteItem");
    },
    addNewItem: (state, action) => {},
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setProducts: (state, action) => {
      state.nProducts = action.payload;
    },
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
