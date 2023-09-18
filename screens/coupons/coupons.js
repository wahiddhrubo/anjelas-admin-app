import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_COUPON } from "../../store/saga/actions";
import { getCoupon } from "../../store/selectors";

export default function Coupons() {
  const dispatch = useDispatch();
  // const { coupons } = useSelector(getCoupon);
  const coupons = [
    {
      _id: "64be9592245ec86b46e7142c",
      code: "KITCHEN2023",
      discountType: "flat-discount",
      discount: 99,
      brakingAmount: 550,
      firstOrder: false,
      maxUses: 1000,
      totalUses: 0,
      expires: "2023-08-23T15:15:30.440Z",
      updated_at: "2023-07-24T15:15:30.448Z",
      __v: 0,
    },
    {
      _id: "64be9663245ec86b46e71435",
      code: "KITCHENFORFAMILY",
      discountType: "flat-discount",
      discount: 495,
      brakingAmount: 2000,
      firstOrder: false,
      maxUses: 1000,
      totalUses: 0,
      expires: "2023-10-23T15:18:59.686Z",
      updated_at: "2023-07-24T15:18:59.693Z",
      __v: 0,
    },
    {
      _id: "64be96a9245ec86b46e71439",
      code: "WELCOME23",
      discountType: "percent-discount",
      discount: 30,
      brakingAmount: 0,
      firstOrder: true,
      maxUses: 1000,
      totalUses: 0,
      expires: "2023-08-23T15:20:09.054Z",
      updated_at: "2023-07-24T15:20:09.059Z",
      __v: 0,
    },
    {
      _id: "64be9622245ec86b46e71431",
      code: "KITCHENFOR2",
      discountType: "flat-discount",
      discount: 210,
      brakingAmount: 1050,
      firstOrder: false,
      maxUses: 1000,
      totalUses: 0,
      expires: "2023-08-23T15:17:54.117Z",
      updated_at: "2023-07-24T15:17:54.122Z",
      __v: 0,
    },
  ];
  useEffect(() => {
    dispatch({ type: GET_ALL_COUPON });
  }, []);
  // console.log({ coupons });
  return <View></View>;
}
