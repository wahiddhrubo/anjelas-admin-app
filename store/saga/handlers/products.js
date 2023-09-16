import { put, call, all } from "redux-saga/effects";
import { axiosCall } from "../call";
import {
  productFail,
  productLoader,
  searchLoader,
  homeProductSuccess,
  searchProductSuccess,
} from "../../slice/products";

import { BACKEND_URL } from "../../../lib/config";
import { sucessAlert } from "../../slice/alert";
import { addSingleProductSuccess } from "../../slice/singleProduct";

export function* fetchHomeProducts(action) {
  yield put(productLoader());

  const itemPerPage = 80;
  const baseUrl = `${BACKEND_URL}/api/v1/items?itemPerPage=${itemPerPage}`;

  try {
    const { data } = yield call(() =>
      axiosCall({ url: baseUrl, method: "get" })
    );
    const { data: homeProducts } = data.items[0];
    yield put(
      homeProductSuccess({
        homeProducts,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(productFail(error));
  }
}
// export function* updateProducts(action) {
//   yield put(productLoader());

//   const { category } = action;
//   const itemPerPage = 100;
//   const fetchUrl = `${BACKEND_URL}/api/v1/items?itemPerPage=${itemPerPage}&categories=${category}`;

//   try {
//     const { data } = yield call(() =>
//       axiosCall({ url: fetchUrl, method: "get" })
//     );
//     const { data: items } = data.items[0];
//     yield put(categoryProductSuccess({ items }));
//   } catch (error) {
//     console.log(error);
//     yield put(productFail(error));
//   }
// }
export function* updateProducts(action) {
  yield put(productLoader());
  const {
    name,
    description,
    stock,
    gallery,
    featuredImage,
    categories,
    tags,
    skus,
  } = action;
  const baseUrl = `${BACKEND_URL}/api/v1/admin/items/new`;

  try {
    yield call(() =>
      axiosCall({
        url: baseUrl,
        method: "post",
        data: {
          name,
          description,
          stock,
          gallery,
          featuredImage,
          categories,
          tags,
          skus,
        },
      })
    );
  } catch (error) {
    console.log(error);
    yield put(productFail(error));
  }
}
export function* addProduct(action) {
  yield put(productLoader());
  const {
    name,
    description,
    stock,
    gallery,
    featuredImage,
    categories,
    tags,
    skus,
  } = action;
  const baseUrl = `${BACKEND_URL}/api/v1/admin/items/new`;

  try {
    const { data } = yield call(() =>
      axiosCall({
        url: baseUrl,
        method: "post",
        data: {
          name,
          description,
          stock,
          gallery,
          featuredImage,
          categories,
          tags,
          skus,
        },
      })
    );
    console.log(data);
    yield put(sucessAlert("Product Added Sucessfully"));
    yield put(addSingleProductSuccess());
  } catch (error) {
    console.log(error);
    yield put(productFail(error));
  }
}
export function* fetchSearchedProducts(action) {
  yield put(searchLoader());

  const { keyword } = action;
  const itemPerPage = 100;
  const fetchUrl = `${BACKEND_URL}/api/v1/items?itemPerPage=${itemPerPage}&keyword=${
    keyword || ""
  }`;
  console.log(keyword);
  try {
    const { data } = yield call(() =>
      axiosCall({ url: fetchUrl, method: "get" })
    );
    const { data: items } = data.items[0];

    yield put(searchProductSuccess({ items }));
  } catch (error) {
    console.log(error);
    yield put(productFail(error));
  }
}

export function* fetchSingleProducts(action) {
  yield put(singleProductLoading());
  const { id } = action;
  const baseUrl = `${BACKEND_URL}/api/v1/items/${id}`;

  try {
    const result = yield call(() => axiosCall({ url: baseUrl, method: "get" }));
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
