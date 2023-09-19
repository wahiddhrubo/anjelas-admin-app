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

export default function UpdateCoupon({ navigation }) {
  const dispatch = useDispatch();
  const router = useRoute();
  const { id } = router.params;
  const { coupon, updateCouponSucess } = useSelector(getCoupon);

  const [code, setCode] = useState();
  const [discount, setDiscount] = useState();
  const [brakingAmount, setBrakingAmount] = useState();
  const [maxUses, setMaxUses] = useState();
  const [expires, setExpires] = useState();
  const [discountType, setDiscountType] = useState();
  const [discountModal, setDiscountModal] = useState(false);
  console.log(discountModal);

  useEffect(() => {
    if (updateCouponSucess) {
      dispatch(resetUpdateCouponSucess());
      navigation.navigate("Coupons");
    }
  }, [updateCouponSucess]);
  console.log(coupon);

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
    }
  }, [coupon]);

  const isDisabled =
    !code ||
    !discount ||
    !brakingAmount ||
    !maxUses ||
    !expires ||
    !discountType;

  const couponHandler = async () => {
    dispatch({
      type: UPDATE_COUPON,
      code,
      discount,
      brakingAmount,
      maxUses,
      expires,
      discountType,
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
                value={discount}
                defaultValue={discount}
              />
              <TextInput
                onChangeText={(text) => setBrakingAmount(parseInt(text))}
                style={styles.inputHalf}
                keyboardType="number-pad"
                placeholder="BrakingAmount"
                value={brakingAmount}
                defaultValue={brakingAmount}
              />
              <TextInput
                onChangeText={(text) => setMaxUses(parseInt(text))}
                style={styles.inputHalf}
                keyboardType="number-pad"
                placeholder="MaxUses"
                value={maxUses}
                defaultValue={maxUses}
              />
              <TextInput
                onChangeText={(text) => setExpires(parseInt(text))}
                style={styles.inputHalf}
                keyboardType="number-pad"
                placeholder="Expires"
                value={expires}
                defaultValue={expires}
              />
            </View>
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
