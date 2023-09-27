import {
  getSingleOrder,
  orderError,
  orderLoading,
  orderSucess,
  reviewSucess,
  updateOrderSucessHandler,
  updateOrders,
} from "../../slice/order";
import { put, call, select } from "redux-saga/effects";
import { axiosCredentialsCall } from "../call";
import { BACKEND_URL } from "../../../lib/config";
import { GET_ORDERS } from "../actions";
import { sucessAlert } from "../../slice/alert";

export function* fetchOrders(action) {
  yield put(orderLoading());
  const { status } = action;
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/admin/orders/${status || ""}`;
    const { data } = yield call(() =>
      axiosCredentialsCall({ url: fetchUrl, method: "get" })
    );
    const { orders } = data;

    yield put(updateOrders({ orders }));
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
    console.log(data);
    yield put(getSingleOrder(data));
  } catch (error) {
    yield put(orderError(error.response.data.message || error.message));
  }
}
export function* updateOrderStatus(action) {
  yield put(orderLoading());
  const { id, status } = action;
  console.log(id, status);
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/admin/orders/${id}`;
    yield call(() =>
      axiosCredentialsCall({ url: fetchUrl, method: "post", data: { status } })
    );

    yield put(updateOrderSucessHandler());
    yield put({ type: GET_ORDERS });
    yield put(sucessAlert("Order Updated Sucessfull"));
  } catch (error) {
    yield put(orderError(error.response.data.message || error.message));
    console.log(error);
  }
}
