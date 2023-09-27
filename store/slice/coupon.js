import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sucess: false,
  error: {},
  loading: false,
  coupon: null,
  total: 0,
  discount: 0,
  coupons: [],
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    couponSucess: (state, action) => {
      state.loading = false;
      state.sucess = true;
    },
    addCouponSucessHandler: (state, action) => {
      state.loading = false;
      state.addCouponSucess = true;
    },
    updateCouponSucessHandler: (state, action) => {
      state.loading = false;
      state.updateCouponSucess = true;
    },
    resetUpdateCouponSucess: (state, action) => {
      state.loading = false;
      state.updateCouponSucess = false;
    },
    resetAddCouponSucess: (state, action) => {
      state.loading = false;
      state.addCouponSucess = false;
    },
    allCouponSucess: (state, action) => {
      state.loading = false;
      state.sucess = true;
      state.coupons = action.payload.coupons;
    },
    couponLoading: (state, action) => {
      state.loading = true;
    },
    couponError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateCouponSlice: (state, action) => {
      state.loading = false;
      state.coupon = action.payload.coupon;
    },
  },
});

export const {
  couponSucess,
  couponLoading,
  couponError,
  updateCouponSlice,
  allCouponSucess,
  addCouponSucessHandler,
  updateCouponSucessHandler,
  resetUpdateCouponSucess,
  resetAddCouponSucess,
} = couponSlice.actions;
export default couponSlice.reducer;
