import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_COUPON } from "../../store/saga/actions";
import { getCoupon } from "../../store/selectors";
import CouponList from "../../components/coupons/couponList";
import StickyHeader from "../../components/stickyHeader";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native";

export default function Coupons({ navigation }) {
  const dispatch = useDispatch();
  const { coupons } = useSelector(getCoupon);

  useEffect(() => {
    dispatch({ type: GET_ALL_COUPON });
  }, []);
  return (
    <View>
      <StickyHeader title={"Coupons"} />
      <View style={styles.container}>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("NewCoupon")}
        >
          <Text style={styles.btnText}>Add New Coupon</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Search A Coupon</Text>
        </Pressable>
        <ScrollView showsVerticalScrollIndicator={false}>
          {coupons?.map((item) => (
            <CouponList
              brakingAmount={item.brakingAmount}
              code={item.code}
              discount={item.discount}
              discountType={item.discountType}
              expires={item.expires}
              firstOrder={item.firstOrder}
              id={item._id}
              maxUses={item.maxUses}
              totalUses={item.totalUses}
              key={item._id}
            />
          ))}
          <View style={{ height: 400 }}></View>
        </ScrollView>

        <View style={{ height: 0 }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "purple",
    width: "100%",
    padding: 8,
    marginVertical: 4,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  btn: {
    backgroundColor: "purple",
    width: "100%",
    padding: 8,
    marginVertical: 4,
  },

  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});
