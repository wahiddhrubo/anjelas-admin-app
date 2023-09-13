import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sucess: false,
  error: {},
  loading: false,
  coupon: "",
  total: 0,
  discount: 0,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    couponSucess: (state, action) => {
      state.loading = false;
      state.sucess = true;
    },
    couponLoading: (state, action) => {
      state.loading = true;
    },
    couponError: (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    updateCoupon: (state, action) => {
      state.loading = false;
      // state.coupon = action.payload.coupon;
      state.total = action.payload.total;
      state.discount = action.payload.discount;
    },
  },
});

export const { couponSucess, couponLoading, couponError, updateCoupon } =
  couponSlice.actions;
export default couponSlice.reducer;
