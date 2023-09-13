import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const alertReducer = createSlice({
  name: "alert",
  initialState,
  reducers: {
    errorAlert: (state, action) => {
      state.type = "error";
      state.id = Math.floor(Math.random() * 500);
      state.text = action.payload.text;
    },
    sucessAlert: (state, action) => {
      state.id = Math.floor(Math.random() * 500);
      state.type = "sucess";
      state.text = action.payload.text;
    },
    resetAlert: (state, action) => {
      state.type = "";
      state.id = "";
      state.text = "";
    },
  },
});

export const { errorAlert, sucessAlert, resetAlert } = alertReducer.actions;
export default alertReducer.reducer;
