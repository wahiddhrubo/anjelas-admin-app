import { createSlice, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/saga.js";
import ProductSlice from "./slice/products";
import cartSlice from "./slice/cart.js";
import userSlice from "./slice/user.js";
import singleProductSlice from "./slice/singleProduct.js";
import orderSlice from "./slice/order.js";
import couponSlice from "./slice/coupon.js";
import alertSlice from "./slice/alert.js";

let sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: false }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: {
    products: ProductSlice,
    cart: cartSlice,
    singleProduct: singleProductSlice,
    user: userSlice,
    order: orderSlice,
    coupon: couponSlice,
    alert: alertSlice,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
