import { put, call, select } from "redux-saga/effects";
import { axiosCredentialsCall } from "../call";
import {
  addToCartNonUser,
  cartLoading,
  removeFromCartNonUser,
  updateCart,
  updateCartNonUser,
} from "../../slice/cart";
import { GET_CART } from "../actions";
import { getUser } from "../../selectors";
import { BACKEND_URL } from "../../../lib/config";
import useAsyncStorage from "../../../hooks/useAsyncStorage";

const [
  getStorageCart,
  addCart,
  clearStorageCart,
  updateStorageCart,
  addStorageCart,
] = useAsyncStorage("Cart");

export function* fetchCart(action) {
  yield put(cartLoading());
  const { user } = yield select((state) => state.user);
  if (user) {
    try {
      const fetchUrl = `${BACKEND_URL}/api/v1/user/cart`;
      const { data } = yield call(() =>
        axiosCredentialsCall({ url: fetchUrl, method: "get" })
      );
      console.log(data);
      yield put(updateCart(data));
    } catch (error) {}
  } else {
    const items = yield getStorageCart();
    yield put(updateCart({ items }));
  }
}

export function* addToCart(action) {
  yield put(cartLoading());
  const { id, pricePerUnit, quantity, variant, name, featuredImage } = action;
  const baseUrl = `${BACKEND_URL}/api/v1/user/cart`;

  const { user } = yield select((state) => state.user);

  if (user) {
    try {
      const result = yield call(() =>
        axiosCredentialsCall({
          url: baseUrl,
          method: "post",
          data: { item: id, pricePerUnit, quantity, variant },
        })
      );
      console.log(result);
      yield put({ type: GET_CART });
    } catch (error) {
      console.log(error);
    }
  } else {
    yield addStorageCart({
      id,
      item: { name, featuredImage },
      pricePerUnit,
      variant,
      quantity,
    });
    yield put({ type: GET_CART });
  }
}
export function* multipleAddToCart(action) {
  yield put(cartLoading());
  const { items } = action;
  const baseUrl = `${BACKEND_URL}/api/v1/user/cart`;

  const { user } = yield select(getUser);

  for (let item of items) {
    const { id, pricePerUnit, quantity, variant, name, featuredImage } = item;
    if (user) {
      try {
        const result = yield call(() =>
          axiosCredentialsCall({
            url: baseUrl,
            method: "post",
            data: { item: id, pricePerUnit, quantity, variant },
          })
        );
        console.log(user);
        yield put({ type: GET_CART });
      } catch (error) {
        console.log(error);
      }
    } else {
      yield addStorageCart({
        id,
        item: { name, featuredImage },
        pricePerUnit,
        variant,
        quantity,
      });
      yield put({ type: GET_CART });
    }
  }
}
export function* updateItemsInCart(action) {
  yield put(cartLoading());
  const { id, quantity, variant } = action;
  const baseUrl = `${BACKEND_URL}/api/v1/update/cart`;
  console.log({ quantity, id, variant });
  const { user } = yield select(getUser);
  console.log(user);
  if (user) {
    try {
      const result = yield call(() =>
        axiosCredentialsCall({
          url: baseUrl,
          method: "post",
          data: { item: id, quantity, variant },
        })
      );
      console.log(result);
      yield put({ type: GET_CART });
    } catch (error) {
      console.log(error);
    }
  } else {
    yield updateStorageCart({
      id,
      quantity,
      variant,
    });
    yield put({ type: GET_CART });
  }
}
export function* multipleUpdatesToCart(action) {
  yield put(cartLoading());
  const { items } = action;
  const baseUrl = `${BACKEND_URL}/api/v1/update/cart`;
  const { user } = yield select(getUser);
  for (let item of items) {
    const { id, quantity, variant } = item;
    if (user) {
      try {
        const result = yield call(() =>
          axiosCredentialsCall({
            url: baseUrl,
            method: "post",
            data: { item: id, quantity, variant },
          })
        );
        yield put({ type: GET_CART });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export function* removeItemFormCart(action) {
  const { id, variant } = action;
  const { user } = yield select(getUser);

  if (user) {
    try {
      const fetchUrl = `${BACKEND_URL}/api/v1/user/cart/${id}`;
      const { data } = yield call(() =>
        axiosCredentialsCall({ url: fetchUrl, method: "delete" })
      );
      yield put({ type: GET_CART });
    } catch (error) {
      console.log(error);
    }
  } else {
    yield clearStorageCart(id);
    yield put({ type: GET_CART });
  }
}
