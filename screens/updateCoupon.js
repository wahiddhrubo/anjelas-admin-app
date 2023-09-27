import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import { GET_COUPON, UPDATE_COUPON } from "../store/saga/actions";
import { getCoupon } from "../store/selectors";
import StickyHeader from "../components/stickyHeader";
import { primaryColor } from "../lib/constant";
import { resetUpdateCouponSucess } from "../store/slice/coupon";
import DiscountTypeSelector from "../components/addCoupon/discountSelector";
import CouponUpdateFeaturedImageUploader from "../components/addCoupon/updateFeaturedImageUploader";
import FirstAndFeaturedOrder from "../components/addCoupon/selectors";
import DiscountPeriodSelector from "../components/addCoupon/discountPeriodSelector";

export default function UpdateCoupon({ navigation }) {
  const dispatch = useDispatch();
  const router = useRoute();
  const { id } = router.params;
  const { coupon, updateCouponSucess } = useSelector(getCoupon);

  const [code, setCode] = useState("");
  const [day, setDay] = useState();
  const [period, setPeriod] = useState();
  const [discount, setDiscount] = useState("");
  const [brakingAmount, setBrakingAmount] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expires, setExpires] = useState("");
  const [featuredImageUri, setFeaturedImageUri] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountModal, setDiscountModal] = useState(false);
  const [firstOrder, setFirstOrder] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState(false);

  useEffect(() => {
    if (updateCouponSucess) {
      dispatch(resetUpdateCouponSucess());
      navigation.navigate("Coupons");
    }
  }, [updateCouponSucess]);

  useEffect(() => {
    dispatch({ type: GET_COUPON, id });
  }, [id]);

  useEffect(() => {
    if (coupon) {
      setCode(coupon?.code);
      setDiscount(coupon?.discount.toString());
      setBrakingAmount(coupon?.brakingAmount.toString());
      setMaxUses(coupon?.maxUses.toString());
      const today = new Date();
      const expiry = new Date(coupon.expires);
      const diffTime = Math.abs(expiry - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log(diffTime);
      setExpires(diffTime >= 1 ? diffDays.toString() : "0");
      setDiscountType(coupon?.discountType);
      setFeaturedImageUri(coupon.featuredImage);
      setFirstOrder(coupon.firstOrder || false);
      setFeaturedOrder(coupon.featuredOrder || false);
      setPeriod(coupon.timeline?.period);
      setDay(coupon.timeline?.day);
    }
  }, [coupon]);

  const hasDiscount = discount || discountType === "zero-delivery";

  const isDisabled =
    !code || !hasDiscount || !maxUses || !expires || !discountType;

  const couponHandler = async () => {
    dispatch({
      type: UPDATE_COUPON,
      code,
      discount: discount || 0,
      brakingAmount,
      maxUses,
      expires,
      discountType,
      id,
      featuredOrder,
      firstOrder,
    });
  };

  return (
    <>
      {coupon ? (
        <>
          <StickyHeader title={`Edit ${code}`} />
          <ScrollView style={styles.container}>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 16,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Edit Coupon
            </Text>
            <View style={styles.form}>
              <TextInput
                onChangeText={(text) => setCode(text)}
                style={styles.inputFull}
                placeholder="Code"
                value={code}
              />
              <DiscountTypeSelector
                discountType={discountType}
                setDiscountType={setDiscountType}
                modal={discountModal}
                setModal={setDiscountModal}
              />

              <TextInput
                onChangeText={(text) => setDiscount(parseInt(text))}
                style={styles.inputHalf}
                keyboardType="number-pad"
                placeholder="Discount"
                value={discount.toString()}
                defaultValue={discount}
              />
              <TextInput
                onChangeText={(text) => setBrakingAmount(parseInt(text))}
                style={styles.inputHalf}
                keyboardType="number-pad"
                placeholder="BrakingAmount"
                value={brakingAmount.toString()}
                defaultValue={brakingAmount}
              />
              <TextInput
                onChangeText={(text) => setMaxUses(parseInt(text))}
                style={styles.inputHalf}
                keyboardType="number-pad"
                placeholder="MaxUses"
                value={maxUses.toString()}
                defaultValue={maxUses}
              />
              <TextInput
                onChangeText={(text) => setExpires(parseInt(text))}
                style={styles.inputHalf}
                keyboardType="number-pad"
                placeholder="Expires"
                value={expires.toString()}
                defaultValue={expires}
              />
            </View>
            <DiscountPeriodSelector
              day={day}
              setDay={setDay}
              period={period}
              setPeriod={setPeriod}
            />
            <FirstAndFeaturedOrder
              featuredOrder={featuredOrder}
              firstOrder={firstOrder}
              setFeaturedOrder={setFeaturedOrder}
              setFirstOrder={setFirstOrder}
            />
            <CouponUpdateFeaturedImageUploader
              featuredImageUri={featuredImageUri}
              setFeaturedImageUris={setFeaturedImageUri}
            />
          </ScrollView>
          <Pressable
            style={
              isDisabled
                ? { ...styles.btn, backgroundColor: "gray" }
                : styles.btn
            }
            onPress={!isDisabled ? couponHandler : null}
          >
            <Text style={styles.btnText}>Update Coupon</Text>
          </Pressable>
        </>
      ) : (
        <View></View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  form: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageSelector: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderWidth: 1,
    borderColor: "purple",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  inputHalf: {
    width: "45%",
    borderWidth: 1,
    borderColor: "purple",
    padding: 8,
    marginVertical: 8,
    backgroundColor: "white",
  },
  inputFull: {
    width: "100%",
    borderWidth: 1,
    borderColor: "purple",
    padding: 8,
    marginVertical: 8,
    backgroundColor: "white",
  },
  skuSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignCoupons: "center",
    marginTop: 32,
    marginBottom: 8,
  },
  icon: {
    width: 42,
    height: 42,
    backgroundColor: primaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignCoupons: "center",
    borderRadius: 500,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "purple",
    padding: 15,
    marginBottom: 16,
    borderRadius: 100,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
