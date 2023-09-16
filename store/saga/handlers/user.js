import { put, call, select } from "redux-saga/effects";
import { axiosCredentialsCall } from "../call";
import {
  loginSuccess,
  loginFail,
  forgotPasswordSuccess,
  loadSuccess,
  logoutSuccess,
  onError,
  userLoading,
  removeFavouriteNonUser,
  addFavouriteNonUser,
  updateFavourite,
  updateLocations,
} from "../../slice/user";
import {
  GET_CART,
  MULTIPLE_ADD_TO_CART,
  LOAD_USER,
  GET_FAVOURITE,
  GET_LOCATION,
} from "../actions";
import { getCart, getUser } from "../../selectors";
import { errorAlert } from "../../slice/alert";
import { BACKEND_URL } from "../../../lib/config";
import { updateCart } from "../../slice/cart";
import useAsyncStorage from "../../../hooks/useAsyncStorage";

const [getStorageFavourites, addStorageFavourites, removeStorageFavourites] =
  useAsyncStorage("Favourites");

export function* login(action) {
  yield put(userLoading());
  const { email, password } = action;
  const url = `${BACKEND_URL}/api/v1/user/login`;

  try {
    const result = yield call(() =>
      axiosCredentialsCall({ url, method: "post", data: { email, password } })
    );
    const { data } = result;
    const { user } = data;
    if (user.role === "admin") {
      yield put(loginSuccess(data));
    } else {
      yield put(errorAlert({ text: "User Not Authorized" }));
    }
  } catch (error) {
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );
  }
}

export function* loadUser(action) {
  try {
    const url = `${BACKEND_URL}/api/v1/user`;

    const { data } = yield call(() =>
      axiosCredentialsCall({ url, method: "get" })
    );
    const { user } = data;
    if (user.role === "admin") {
      yield put(loadSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* logout(action) {
  yield put(userLoading());
  try {
    const url = `${BACKEND_URL}/api/v1/logout`;

    const { data } = yield call(() =>
      axiosCredentialsCall({ url, method: "get" })
    );

    yield put(logoutSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );
  }
}
export function* register(action) {
  yield put(userLoading());
  const { email, password, username } = action;
  const { items } = yield select(getCart);

  try {
    const url = `${BACKEND_URL}/api/v1/register`;

    const { data } = yield call(() =>
      axiosCredentialsCall({
        url,
        method: "post",
        data: { email, password, username },
      })
    );
    if (items) {
      yield put({ type: MULTIPLE_ADD_TO_CART, items });
    }
    yield put({ type: GET_CART });

    yield put(loginSuccess(data));
  } catch (error) {
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );

    console.log(error.response.data.message || error.message);
  }
}
export function* forgotPassword(action) {
  yield put(userLoading());
  const { email } = action;

  try {
    const url = `${BACKEND_URL}/api/v1/user/indentify`;

    const { data } = yield call(() =>
      axiosCredentialsCall({ url, method: "post", data: { email } })
    );

    yield put(forgotPasswordSuccess(data));
  } catch (error) {
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );
  }
}
export function* resetPassword(action) {
  yield put(userLoading());
  const { confirmPassword, token, password } = action;
  const { items } = yield select(getCart);

  try {
    const url = `${BACKEND_URL}/api/v1/user/recover`;

    const { data } = yield call(() =>
      axiosCredentialsCall({
        url,
        method: "post",
        data: { confirmPassword, token, password },
      })
    );
    if (items) {
      yield put({ type: MULTIPLE_ADD_TO_CART, items });
    }
    yield put({ type: GET_CART });
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );

    console.log(error.response.data.message || error.message);
  }
}
