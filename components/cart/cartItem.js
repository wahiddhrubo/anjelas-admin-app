import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { primaryColor } from "../../lib/constant";
import { useDispatch } from "react-redux";
import { REMOVE_ITEM_FROM_CART, UPDATE_CART } from "../../store/saga/actions";
export default function CartItem({ name, variant, quantity, price, img, id }) {
  const dispatch = useDispatch();
  const increaseQuantity = () => {
    console.log({ quantity, id, variant });
    if (quantity) {
      dispatch({
        type: UPDATE_CART,
        id,
        quantity: quantity + 1,
        variant,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        id,
        name,
        featuredImage: img,
        pricePerUnit: price,
        quantity: 1,
        variant,
      });
    }
  };
  const decreaseQuantity = () => {
    if (quantity === 1) {
      dispatch({ type: REMOVE_ITEM_FROM_CART, id, variant });
      return;
    }
    dispatch({
      type: UPDATE_CART,
      id,
      quantity: quantity - 1,
      variant,
    });
  };
  const removeHandler = () => {
    dispatch({ type: REMOVE_ITEM_FROM_CART, id, variant });
    return;
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          width={300}
          height={300}
          source={{ uri: img }}
        />
      </View>
      <View style={styles.textbox}>
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.detailsRow}>
          <View>
            <Text>
              <Text style={{ fontWeight: "bold" }}>৳{price}</Text> | {variant}
            </Text>
          </View>
          <View style={styles.counter}>
            <Pressable onPress={removeHandler}>
              <EvilIcons name="trash" size={28} color={primaryColor} />
            </Pressable>
            <Pressable onPress={decreaseQuantity}>
              <Text style={styles.updater}>-</Text>
            </Pressable>
            <Text>{quantity}</Text>
            <Pressable onPress={increaseQuantity}>
              <Text style={styles.updater}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#80808015",
    flexDirection: "row",
    marginVertical: 12,
    width: "90%",
    marginHorizontal: "auto",
    padding: 8,
    alignItems: "center",
    marginHorizontal: "5%",
    borderRadius: 8,
    height: 105,
  },
  img: {
    width: 85,
    height: 85,
  },
  textbox: {
    width: "73%",
    height: "100%",
    paddingVertical: 12,
    paddingLeft: 12,
    alignItems: "stretch",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: "auto",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  updater: {
    paddingHorizontal: 16,
    backgroundColor: "#fe750210",
    color: primaryColor,
    borderRadius: 4,
    // height: 15,
    fontSize: 22,
    // fontWeight: "bold",
  },
});
