import { takeLatest } from "redux-saga/effects";
import {
  fetchCategoryProducts,
  fetchHomeProducts,
  fetchProducts,
  fetchSearchedProducts,
  fetchSingleProducts,
} from "./handlers/products";
import {
  ADD_FAVOURITE,
  ADD_TO_CART,
  CREATE_ORDER,
  FORGOT_PASSWORD,
  GET_CART,
  GET_CATEGORY_PRODUCTS,
  GET_COUPON,
  GET_FAVOURITE,
  GET_HOME_PRODUCTS,
  GET_LOCATION,
  GET_ORDERS,
  GET_SEARCH_PRODUCTS,
  GET_SINGLE_ORDERS,
  GET_SINGLE_PRODUCT,
  LOAD_USER,
  LOGIN,
  LOGOUT,
  MULTIPLE_ADD_TO_CART,
  MULTIPLE_UPDATE_CART,
  POST_REVIEW,
  PRODUCTS_LOADING,
  REGISTER,
  REMOVE_FAVOURITE,
  REMOVE_ITEM_FROM_CART,
  RESET_PASSWORD,
  UPDATE_CART,
} from "./actions";
import {
  addFavourite,
  forgotPassword,
  getFavourite,
  getLocation,
  loadUser,
  login,
  logout,
  register,
  removeFavourite,
  resetPassword,
} from "./handlers/user";
import {
  addToCart,
  fetchCart,
  multipleAddToCart,
  multipleUpdatesToCart,
  removeItemFormCart,
  updateItemsInCart,
} from "./handlers/cart";
import { createOrder, fetchOrders, fetchSingleOrder } from "./handlers/orders";
import { getSingleOrder } from "../slice/order";
import { fetchCoupon } from "./handlers/coupon";

export default function* rootSaga() {
  yield takeLatest(GET_HOME_PRODUCTS, fetchHomeProducts);
  yield takeLatest(GET_CATEGORY_PRODUCTS, fetchCategoryProducts);
  yield takeLatest(GET_SEARCH_PRODUCTS, fetchSearchedProducts);
  yield takeLatest(GET_SINGLE_PRODUCT, fetchSingleProducts);
  yield takeLatest(LOGIN, login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(REGISTER, register);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeLatest(REMOVE_ITEM_FROM_CART, removeItemFormCart);
  yield takeLatest(MULTIPLE_UPDATE_CART, multipleUpdatesToCart);
  yield takeLatest(UPDATE_CART, updateItemsInCart);
  yield takeLatest(GET_CART, fetchCart);
  yield takeLatest(ADD_TO_CART, addToCart);
  yield takeLatest(MULTIPLE_ADD_TO_CART, multipleAddToCart);
  yield takeLatest(GET_ORDERS, fetchOrders);
  yield takeLatest(CREATE_ORDER, createOrder);
  yield takeLatest(GET_SINGLE_ORDERS, fetchSingleOrder);
  yield takeLatest(GET_FAVOURITE, getFavourite);
  yield takeLatest(ADD_FAVOURITE, addFavourite);
  yield takeLatest(REMOVE_FAVOURITE, removeFavourite);
  yield takeLatest(GET_COUPON, fetchCoupon);
  yield takeLatest(GET_LOCATION, getLocation);
}
