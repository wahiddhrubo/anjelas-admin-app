import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailSentSuccess: false,
  isAuthenticated: false,
  favourites: [],
  loading: false,
  userLocation: {
    streetAddress: "",
    area: "",
  },
  locations: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoading: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.emailSentSuccess = true;
    },

    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    onError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateFavourite: (state, action) => {
      console.log(action.payload);
      state.favourites = action.payload.favourites;
      state.loading = false;
    },
    updateUserLoc: (state, action) => {
      state.userLocation = action.payload;
    },
    updateLocations: (state, action) => {
      state.loading = false;
      state.locations = action.payload;
    },
  },
});

export const {
  loadSuccess,
  userLoading,
  loginSuccess,
  logoutSuccess,
  forgotPasswordSuccess,
  onError,
  updateFavourite,
  updateUserLoc,
  updateLocations,
} = userSlice.actions;
export default userSlice.reducer;
