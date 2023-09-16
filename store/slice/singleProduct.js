import { createSlice } from "@reduxjs/toolkit";
import { SINGLEPRODucTS_FAIL, PRODUCTS_SUCCESS } from "../saga/actions";
const initialState = {};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    singleProductLoader: (state, action) => {
      state.loading = true;
    },

    singleProductSuccess: (state, action) => {
      const { item } = action.payload;
      state.item = item;
    },
    addSingleProductSuccess: (state, action) => {
      state.loading = false;
      state.singleProductAddSuccess = true;
    },
    resetSingleProductAddSuccess: (state, action) => {
      state.loading = false;
      state.singleProductAddSuccess = false;
    },
    updateSingleProductSuccess: (state, action) => {
      state.loading = false;
      state.singleProductUpdateSuccess = true;
    },
    resetSingleProductUpdateSuccess: (state, action) => {
      state.loading = false;
      state.singleProductUpdateSuccess = false;
    },

    singleProductFail: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  singleProductLoader,
  singleProductSuccess,
  addSingleProductSuccess,
  resetSingleProductAddSuccess,
  updateSingleProductSuccess,
  resetSingleProductUpdateSuccess,
  singleProductFail,
} = singleProductSlice.actions;
export default singleProductSlice.reducer;
