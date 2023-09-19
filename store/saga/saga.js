import { takeLatest } from "redux-saga/effects";
import {
  addProduct,
  deleteSingleProduct,
  fetchHomeProducts,
  fetchSearchedProducts,
  fetchSingleProducts,
} from "./handlers/products";
import {
  ADD_PRODUCT,
  CREATE_COUPON,
  DELETE_COUPON,
  DELETE_SINGLE_PRODUCT,
  FORGOT_PASSWORD,
  GET_ALL_COUPON,
  GET_COUPON,
  GET_HOME_PRODUCTS,
  GET_ORDERS,
  GET_SEARCH_PRODUCTS,
  GET_SINGLE_ORDERS,
  GET_SINGLE_PRODUCT,
  LOAD_ALL_USER,
  LOAD_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  RESET_PASSWORD,
  UPDATE_COUPON,
  UPDATE_ORDER_STATUS,
} from "./actions";
import {
  forgotPassword,
  getAllUsers,
  loadUser,
  login,
  logout,
  register,
  resetPassword,
} from "./handlers/user";

import {
  fetchOrders,
  fetchSingleOrder,
  updateOrderStatus,
} from "./handlers/orders";
import {
  createCoupon,
  deleteCoupon,
  fetchAllCoupon,
  fetchCoupon,
  updateCoupon,
} from "./handlers/coupon";

export default function* rootSaga() {
  yield takeLatest(GET_HOME_PRODUCTS, fetchHomeProducts);
  yield takeLatest(GET_SEARCH_PRODUCTS, fetchSearchedProducts);
  yield takeLatest(GET_SINGLE_PRODUCT, fetchSingleProducts);
  yield takeLatest(ADD_PRODUCT, addProduct);
  yield takeLatest(DELETE_SINGLE_PRODUCT, deleteSingleProduct);

  yield takeLatest(LOGIN, login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeLatest(LOAD_ALL_USER, getAllUsers);

  yield takeLatest(GET_ORDERS, fetchOrders);
  yield takeLatest(UPDATE_ORDER_STATUS, updateOrderStatus);
  yield takeLatest(GET_SINGLE_ORDERS, fetchSingleOrder);

  yield takeLatest(GET_ALL_COUPON, fetchAllCoupon);
  yield takeLatest(CREATE_COUPON, createCoupon);
  yield takeLatest(UPDATE_COUPON, updateCoupon);
  yield takeLatest(DELETE_COUPON, deleteCoupon);
  yield takeLatest(GET_COUPON, fetchCoupon);
}
