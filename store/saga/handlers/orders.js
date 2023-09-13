import {
  getSingleOrder,
  orderError,
  orderLoading,
  orderSucess,
  reviewSucess,
  updateOrders,
} from "../../slice/order";
import { put, call, select } from "redux-saga/effects";
import { axiosCredentialsCall } from "../call";
import { BACKEND_URL } from "../../../lib/config";

export function* fetchOrders(action) {
  yield put(orderLoading());
  const { status } = action;
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/user/orders/${status || ""}`;
    const { data } = yield call(() =>
      axiosCredentialsCall({ url: fetchUrl, method: "get" })
    );
    yield put(updateOrders(data));
  } catch (error) {
    yield put(orderError(error.response.data.message || error.message));
  }
}

export function* fetchSingleOrder(action) {
  yield put(orderLoading());
  const { id } = action;
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/user/orders/order/${id}`;
    const { data } = yield call(() =>
      axiosCredentialsCall({ url: fetchUrl, method: "get" })
    );
    yield put(getSingleOrder(data));
  } catch (error) {
    yield put(orderError(error.response.data.message || error.message));
  }
}
export function* createOrder(action) {
  yield put(orderLoading());
  const {
    location,
    deliveryCharge,
    tax,
    subTotal,
    total,
    coupon,
    discount,
    paymentMethod,
    deliveryDate,
    deliveryTime,
  } = action;
  const data = {
    location,
    deliveryCharge,
    tax,
    subTotal,
    total,
    coupon,
    discount,
    deliveryDate,
    deliveryTime,
  };
  const method = paymentMethod || "";
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/order/${method}`;
    const result = yield call(() =>
      axiosCredentialsCall({ url: fetchUrl, method: "post", data })
    );
    yield put(orderSucess());
  } catch (error) {
    yield put(orderError(error.response.data.message || error.message));
  }
}

export function* postReview(action) {
  const { orderId, itemId, rating, comment } = action;
  const data = {
    orderId,
    itemId,
    rating,
    comment,
  };

  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/user/review`;
    const result = yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "post",
        data,
      })
    );
    yield put(reviewSucess());
  } catch (error) {
    console.log(error.response || error.message);
  }
}
