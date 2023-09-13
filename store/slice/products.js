import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_FAIL, PRODUCTS_SUCCESS } from "../saga/actions";
const initialState = {};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productLoader: (state, action) => {
      state.loading = true;
    },
    searchLoader: (state, action) => {
      state.searchLoading = true;
    },
    productSuccess: (state, action) => {
      const { items, total, pages } = action.payload;
      state.loading = false;
      state.items = items;
      state.numOfProducts = total;
      state.pages = pages;
    },
    homeProductSuccess: (state, action) => {
      const { homeProducts, total, pages } = action.payload;
      state.loading = false;
      state.homeProducts = homeProducts;
    },
    categoryProductSuccess: (state, action) => {
      const { items } = action.payload;
      state.loading = false;
      state.categoryProducts = items;
    },
    searchProductSuccess: (state, action) => {
      const { items } = action.payload;
      state.loading = false;
      state.searchProducts = items;
    },

    productFail: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  productFail,
  productLoader,
  productSuccess,
  latestProductSuccess,
  searchLoader,
  homeProductSuccess,
  categoryProductSuccess,
  searchProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
