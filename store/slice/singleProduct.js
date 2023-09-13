import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  item: {},
  loading: false,
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    singleProductLoading: (state, action) => {
      state.loading = true;
    },
    singleProductSuccess: (state, action) => {
      state.loading = false;
      state.item = action.payload.item;
    },
    singleproductFail: (state, action) => {
      state.loading = false;
    },
  },
});

export const { singleproductFail, singleProductLoading, singleProductSuccess } =
  singleProductSlice.actions;
export default singleProductSlice.reducer;
