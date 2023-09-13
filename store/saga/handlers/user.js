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
  const { items } = yield select(getCart);

  try {
    const result = yield call(() =>
      axiosCredentialsCall({ url, method: "post", data: { email, password } })
    );
    console.log(result);
    const { data } = result;
    yield put(loginSuccess(data));
    if (items) {
      yield put({ type: MULTIPLE_ADD_TO_CART, items });
    }

    yield put({ type: GET_CART });
    yield put({ type: GET_FAVOURITE });
  } catch (error) {
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );
    console.log(error.response.data.message || error.message);
  }
}
export function* loadUser(action) {
  try {
    const url = `${BACKEND_URL}/api/v1/user`;

    const { data } = yield call(() =>
      axiosCredentialsCall({ url, method: "get" })
    );
    yield put({ type: GET_CART });
    yield put({ type: GET_FAVOURITE });
    yield put(loadSuccess(data));
  } catch (error) {
    console.log(error);
    // console.log(error.response.data.message || error.message);
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

export function* addLocation(action) {
  yield put(userLoading());
  const { floorNo, apartmentNo, streetAddress, area, phone, locType } = action;
  const data = {
    apartmentNo,
    floorNo,
    streetAddress,
    area,
    phone,
  };
  const slug = locType ? locType : "";
  const { user } = yield select(getUser);

  console.log(data);
  try {
    if (!user.phone) {
      console.log("working");
      const dt = { phone };
      const updateUrl = `${BACKEND_URL}/api/v1/user`;
      console.log(dt);
      const rslt = yield call(() =>
        axiosCredentialsCall({
          url: updateUrl,
          method: "post",
          dt,
        })
      );
    }
    const fetchUrl = `${BACKEND_URL}/api/v1/user/locations/${slug}`;
    const result = yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "post",
        data,
      })
    );
    yield put({ type: GET_LOCATION });
  } catch (error) {
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );
  }
}

export function* getLocation(action) {
  yield put(userLoading());

  const fetchUrl = `${BACKEND_URL}/api/v1/user/locations`;
  try {
    const { data } = yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "get",
      })
    );
    yield put(updateLocations(data.locations));
  } catch (error) {
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );
  }
}

export function* deleteLocation(action) {
  const { id, locType } = action;
  const data = { id, type: locType };
  console.log(data);

  const { user } = yield select(getUser);

  try {
    const fetchUrl = `${BACKEND_URL}/api/v1/user/locations/`;
    const result = yield call(() =>
      axiosCredentialsCall({
        url: fetchUrl,
        method: "delete",
        data,
      })
    );
    yield put({ type: GET_LOCATION });
  } catch (error) {
    yield put(
      errorAlert({ text: error.response.data.message || error.message })
    );
  }
}

export function* removeFavourite(action) {
  const { id } = action;
  const { user } = yield select(getUser);

  if (user) {
    try {
      const fetchUrl = `${BACKEND_URL}/api/v1/user/favourite/${id}`;
      const { data } = yield call(() =>
        axiosCredentialsCall({ url: fetchUrl, method: "delete" })
      );
      yield put({ type: GET_FAVOURITE });
    } catch (error) {
      console.log(error);
    }
  } else {
    yield removeStorageFavourites(id);
    yield put({ type: GET_FAVOURITE });
  }
}
export function* addFavourite(action) {
  const { id, name, featuredImage, price, skus } = action;
  const { user } = yield select(getUser);

  if (user) {
    try {
      const fetchUrl = `${BACKEND_URL}/api/v1/user/favourite/${id}`;
      const { data } = yield call(() =>
        axiosCredentialsCall({ url: fetchUrl, method: "post" })
      );
      console.log({ data });
      yield put({ type: GET_FAVOURITE });
    } catch (error) {
      console.log(error.response.data);
    }
  } else {
    yield addStorageFavourites({
      id,
      name,
      featuredImage,
      price,
      skus,
    });
    yield put({ type: GET_FAVOURITE });
  }
}
export function* getFavourite(action) {
  const { user } = yield select(getUser);

  if (user) {
    try {
      const fetchUrl = `${BACKEND_URL}/api/v1/user/favourite`;
      const { data } = yield call(() =>
        axiosCredentialsCall({ url: fetchUrl, method: "get" })
      );
      yield put(updateFavourite(data));
    } catch (error) {
      console.log(error.response.data);
    }
  } else {
    const favourites = yield getStorageFavourites();
    console.log(favourites);

    yield put(updateFavourite({ favourites }));
  }
}
