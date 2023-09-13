import { PRODUCTS_FAIL, PRODUCTS_SUCCESS } from "../actions";
import { put, call, all } from "redux-saga/effects";
import { axiosCall } from "../call";
import {
  productSuccess,
  productFail,
  latestProductSuccess,
  productLoader,
  searchLoader,
  homeProductSuccess,
  categoryProductSuccess,
  searchProductSuccess,
} from "../../slice/products";
import {
  singleProductLoading,
  singleProductSuccess,
  singleproductFail,
} from "../../slice/singleProduct";
import { BACKEND_URL } from "../../../lib/config";

export function* fetchHomeProducts(action) {
  yield put(productLoader());

  const itemPerPage = 8;
  const baseUrl = `${BACKEND_URL}/api/v1/items?itemPerPage=${itemPerPage}`;

  try {
    const fetchLatestUrl = `${baseUrl}`;
    const fetchByPriceUrl = `${baseUrl}&sortBy=skus.price`;
    const fetchByReviewUrl = `${baseUrl}&sortBy=reviews.rating`;
    const fetchMostLovedUrl = `${baseUrl}&categories=Favourites!`;
    const fetchDawatUrl = `${baseUrl}&categories=Dawat`;

    const {
      latestItems,
      bestValueItems,
      highestRatedItems,
      mostLovedItems,
      DawatItems,
    } = yield all({
      latestItems: call(() =>
        axiosCall({ url: fetchLatestUrl, method: "get" })
      ),
      bestValueItems: call(() =>
        axiosCall({ url: fetchByPriceUrl, method: "get" })
      ),
      highestRatedItems: call(() =>
        axiosCall({ url: fetchByReviewUrl, method: "get" })
      ),
      mostLovedItems: call(() =>
        axiosCall({ url: fetchMostLovedUrl, method: "get" })
      ),
      DawatItems: call(() => axiosCall({ url: fetchDawatUrl, method: "get" })),
    });

    const homeProducts = [
      {
        title: "Latest",
        data: latestItems.data.items[0].data,
      },
      {
        title: "Best value",
        data: bestValueItems.data.items[0].data,
      },
      {
        title: "Highest Rated",
        data: highestRatedItems.data.items[0].data,
      },
      {
        title: "Most Loved ",
        data: mostLovedItems.data.items[0].data,
      },
      {
        title: "Enjoy with guest",
        data: DawatItems.data.items[0],
      },
    ];

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
export function* fetchCategoryProducts(action) {
  yield put(productLoader());

  const { category } = action;
  const itemPerPage = 100;
  const fetchUrl = `${BACKEND_URL}/api/v1/items?itemPerPage=${itemPerPage}&categories=${category}`;

  try {
    const { data } = yield call(() =>
      axiosCall({ url: fetchUrl, method: "get" })
    );
    const { data: items } = data.items[0];
    yield put(categoryProductSuccess({ items }));
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
    yield put(singleProductSuccess(result.data));
  } catch (error) {
    console.log(error);
    yield put(singleproductFail(error));
  }
}
