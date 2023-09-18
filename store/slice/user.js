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
  users: [],
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
    allUsersLoadSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.users = action.payload.users;
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
  },
});

export const {
  loadSuccess,
  userLoading,
  loginSuccess,
  logoutSuccess,
  forgotPasswordSuccess,
  onError,
  allUsersLoadSuccess,
} = userSlice.actions;
export default userSlice.reducer;
