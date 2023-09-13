import { put, call } from "redux-saga/effects";
import { axiosCredentialsCall } from "../call";
import { couponError, couponLoading, updateCoupon } from "../../slice/coupon";
import { BACKEND_URL } from "../../../lib/config";

export function* fetchCoupon(action) {
  yield put(couponLoading());
  const { code, totalAmount, deliveryCharge } = action;
  console.log({ code, totalAmount, deliveryCharge });
  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/coupon/${code}`;
    const { data } = yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "post",
        data: { totalAmount, deliveryCharge },
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
