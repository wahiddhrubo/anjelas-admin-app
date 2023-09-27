import { put, call } from "redux-saga/effects";
import { axiosCredentialsCall } from "../call";
import {
  addCouponSucessHandler,
  allCouponSucess,
  couponError,
  couponLoading,
  updateCouponSlice,
  updateCouponSucessHandler,
} from "../../slice/coupon";
import { BACKEND_URL } from "../../../lib/config";
import { GET_ALL_COUPON } from "../actions";
import { sucessAlert } from "../../slice/alert";

export function* fetchCoupon(action) {
  yield put(couponLoading());
  const { id } = action;
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/coupon/${id}`;
    const { data } = yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "get",
      })
    );

    const { coupon } = data;
    yield put(updateCouponSlice({ coupon }));
  } catch (error) {
    console.log(error);
    yield put(couponError(error.response.data.message || error.message));
  }
}
export function* fetchAllCoupon(action) {
  yield put(couponLoading());
  const { code, totalAmount, deliveryCharge } = action;
  console.log({ code, totalAmount, deliveryCharge });
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/coupon`;
    const { data } = yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "get",
      })
    );

    console.log(data);
    const { coupons } = data;
    yield put(allCouponSucess({ coupons }));
  } catch (error) {
    console.log(error);
    yield put(couponError(error.response.data.message || error.message));
  }
}

export function* updateCoupon(action) {
  yield put(couponLoading());
  const { id, featuredImage } = action;

  try {
    console.log(featuredImage);
    const fetchUrl = `${BACKEND_URL}/api/v1/coupon/update/${id}`;
    yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "post",
        data: action,
      })
    );

    yield put({ type: GET_ALL_COUPON });
    yield put(sucessAlert("Coupon Updated Sucessfully"));
    yield put(updateCouponSucessHandler());
  } catch (error) {
    console.log(error);
    yield put(couponError(error.response.data.message || error.message));
  }
}
export function* createCoupon(action) {
  yield put(couponLoading());

  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/coupon`;
    yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "post",
        data: action,
      })
    );

    yield put(sucessAlert("Coupon Added Sucessfully"));
    yield put({ type: GET_ALL_COUPON });
    yield put(addCouponSucessHandler());
  } catch (error) {
    console.log(error);
    yield put(couponError(error.response.data.message || error.message));
  }
}

export function* deleteCoupon(action) {
  yield put(couponLoading());
  const { ids } = action;
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/coupon`;
    yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "delete",
        data: { ids },
      })
    );

    yield put({ type: GET_ALL_COUPON });
    yield put(sucessAlert("Coupon Deleted Sucessfully"));
  } catch (error) {
    console.log(error);
    yield put(couponError(error.response.data.message || error.message));
  }
}
