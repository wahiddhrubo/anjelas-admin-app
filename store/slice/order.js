import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderSucess: (state, action) => {
      state.loading = false;
      state.sucess = true;
    },
    reviewSucess: (state, action) => {
      state.loading = false;
      state.reviewSucess = true;
    },
    resetReview: (state, action) => {
      state.loading = false;
      state.reviewSucess = false;
    },
    orderLoading: (state, action) => {
      state.loading = true;
    },
    orderError: (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    updateOrders: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    getSingleOrder: (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
    },
  },
});

export const {
  updateOrders,
  getSingleOrder,
  orderSucess,
  orderLoading,
  orderError,
  reviewSucess,
  resetReview,
} = orderSlice.actions;
export default orderSlice.reducer;
