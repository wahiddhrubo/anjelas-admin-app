import React from "react";
import { Pressable } from "react-native";
import { View } from "react-native";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { primaryColor } from "../../lib/constant";
import { useNavigation } from "@react-navigation/native";
import { MotiView, useAnimationState } from "moti";
import { Alert } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DELETE_COUPON, DELETE_SINGLE_PRODUCT } from "../../store/saga/actions";

export default function CouponList({
  code,
  discountType,
  discount,
  brakingAmount,
  firstOrder,
  maxUses,
  totalUses,
  expires,
  id,
}) {
  const navigation = useNavigation();
  const [deleteCoupon, setDeleteCoupon] = useState();
  const dispatch = useDispatch();
  const animatedDivState = useAnimationState({
    from: {
      scaleY: 0,
      height: 0,
    },
    active: {
      scaleY: 1,
      height: "auto",
    },
  });
  const toggleDiv = () => {
    const curr = animatedDivState.current;
    if (curr === "from") {
      animatedDivState.transitionTo("active");
    } else {
      animatedDivState.transitionTo("from");
    }
  };

  useEffect(() => {
    if (deleteCoupon) {
      dispatch({ type: DELETE_COUPON, ids: [id] });
    }
  }, [deleteCoupon]);
  const dateFormatter = (dt) =>
    new Intl.DateTimeFormat("bd", {
      dateStyle: "full",
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dt));

  const today = new Date();
  const expiry = new Date(expires);
  const expired = today > expiry;
  const deleteCouponPermission = () =>
    Alert.alert(`Delete Coupon`, `${code} Will Be Deleted!!!`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => setDeleteCoupon(true) },
    ]);
  return (
    <>
      <Pressable onPress={toggleDiv} style={styles.box}>
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 200,
            backgroundColor: primaryColor,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {discountType == "percent-discount" ? (
            <Feather name="percent" size={24} color="white" />
          ) : (
            <Feather name="dollar-sign" size={24} color="white" />
          )}
        </View>
        <View style={styles.textbox}>
          <View
            style={{
              flexDirection: "row",
              width: "75%",
            }}
          >
            <View>
              <Text style={styles.title}>{code}</Text>
            </View>
            {firstOrder && (
              <MaterialCommunityIcons
                name="numeric-1-circle"
                size={24}
                color={primaryColor}
                style={{ marginLeft: "auto" }}
              />
            )}
          </View>
          <Text style={styles.price}>
            {`${
              discountType === "percent-discount"
                ? `${discount}% off`
                : discountType === "zero-delivery"
                ? `Free Delivery`
                : `TK ${discount} off`
            } `}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("UpdateCoupon", { id })}
          style={styles.btn}
        >
          <Entypo name="brush" size={24} color="white" />
        </Pressable>
      </Pressable>
      <MotiView state={animatedDivState} style={styles.animatedDiv}>
        {brakingAmount ? (
          <View style={styles.table}>
            <View>
              <Text style={styles.tableTitle}>Minimum Order </Text>
            </View>
            <View>
              <Text style={styles.tableText}>Tk {brakingAmount} </Text>
            </View>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.table}>
          <View>
            <Text style={styles.tableTitle}>Uses remaining </Text>
          </View>
          <View>
            <Text style={styles.tableText}>{maxUses - totalUses} </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View>
            <Text style={styles.tableTitle}>Expires </Text>
          </View>
          <View>
            <Text style={styles.tableText}>
              {dateFormatter(expires)} {expired && "(Expired)"}
            </Text>
          </View>
        </View>
        <Pressable style={styles.deleteBtn} onPress={deleteCouponPermission}>
          <Text style={styles.deleteText}>Delete Coupon</Text>
        </Pressable>
      </MotiView>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
    minHeight: 90,
  },
  img: {
    width: 75,
    height: 75,
    resizeMode: "cover",
    borderRadius: 4,
  },
  textbox: {
    marginRight: "auto",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    width: "100%",
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: primaryColor,
  },
  btn: {
    height: 48,
    width: 48,
    backgroundColor: "purple",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  animatedDiv: {
    backgroundColor: "white",
    padding: 8,
    transform: [{ scaleY: 0 }],
    height: 0,
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
    // flexWrap: "wrap",
  },
  tableText: {
    // lineHeight: 24,
  },
  deleteBtn: {
    width: "100%",
    backgroundColor: "tomato",
    padding: 8,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
