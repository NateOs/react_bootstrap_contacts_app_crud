import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsData: (state, action) => {
      state.products = action.payload.products;
    },
    setState: (state, action) => {
      state.products = action.payload;
    },
    saveItem: (state, action) => {
      localStorage.setItem("productsState", JSON.stringify(state.products));
    },

    deleteItem: (state, action) => {
      console.log("deleteItem", action.payload);
      let id = action.payload;
      const itemIndex = state.products.map((item) => item.id).indexOf(id);
      console.log(itemIndex);
      state.products.splice(itemIndex, 1);
    },
    addNewItem: (state, action) => {
      let newItem = {
        id: action.payload.id,
        name: action.payload.name,
        prices: [
          {
            id: 1,
            price: action.payload.prices,
            date: new Date().toISOString(),
          },
        ],
      };
      state.products.push(newItem);
      localStorage.setItem("productsState", JSON.stringify(state.products));
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setProducts: (state, action) => {},
  },
});

export const {
  addNewItem,
  setNormalisedData,
  setProductsData,
  deleteItem,
  setState,
  setPrices,
  setProducts,
  saveItem,
} = productsSlice.actions;
export default productsSlice.reducer;
