import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_FAIL, PRODUCTS_SUCCESS } from "../saga/actions";
const initialState = {
  items: [],
};

const exampleCart = [
  {
    id: 1,
    item: { name: "example", featutredImage: "" },
    pricePerUnit: 1,
    quantity: 2,
  },
];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.items = action.payload.cart?.items || action.payload.items;
      state.loading = false;
    },

    getPriceAndQuantity: (state, action) => {
      state.quantity = state.items?.reduce(
        (prev, curr) => prev + curr.quantity,
        0
      );
      state.price = state.items?.reduce(
        (prev, curr) => prev + curr.pricePerUnit * curr.quantity,
        0
      );
    },
    cartLoading: (state, action) => {
      state.loading = true;
    },
  },
});

export const {
  addToCartNonUser,
  removeFromCartNonUser,
  updateCartNonUser,
  getPriceAndQuantity,
  updateCart,
  cartLoading,
} = cartSlice.actions;
export default cartSlice.reducer;
