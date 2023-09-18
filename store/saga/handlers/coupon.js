import { put, call } from "redux-saga/effects";
import { axiosCredentialsCall } from "../call";
import {
  allCouponSucess,
  couponError,
  couponLoading,
  updateCoupon,
} from "../../slice/coupon";
import { BACKEND_URL } from "../../../lib/config";

export function* fetchCoupon(action) {
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

    const { total, discount } = data;
    console.log(total, discount);
    yield put(updateCoupon({ total, discount }));
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
