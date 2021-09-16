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
    getItemInfo: (state, action) => {
      console.log(action.payload);
      // let id = action.payload;
      // const itemToUpdate = state.products.map((item) => item.id === id);
      // console.log('itemToUpdate');
    },
    updatePrice: (state, action) => {
      console.log("newprice", action.payload);
      let id = action.payload.id;
      let newPrice = {
        id: state.products.length + 1,
        price: action.payload.newPrice,
        date: new Date().toISOString(),
      };

      //       date: "2018-11-01T17:16:32+00:00"
      // id: 2
      // price: 9.2

      const itemToUpdate = state.products.find((product) => product.id === id);
      console.log(JSON.stringify(itemToUpdate, undefined, 2));

      const indexOfItem = state.products.indexOf(itemToUpdate);
      itemToUpdate.prices.push(newPrice);

      state.products.splice(indexOfItem, 1, itemToUpdate);
      // after splice to state and save to local
      localStorage.setItem("productsState", JSON.stringify(state.products));
    },
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
  getItemInfo,
  updatePrice,
} = productsSlice.actions;
export default productsSlice.reducer;
