import React from "react";
import { Button, Pressable, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/selectors";
import { ADD_TO_CART } from "../../store/saga/actions";
import { primaryColor } from "../../lib/constant";
import { useNavigation } from "@react-navigation/native";

export default function CartBtn({
  id,
  name,
  featuredImage,
  pricePerUnit,
  quantity,
  variant,
}) {
  const navigation = useNavigation();
  const { items: cart } = useSelector(getCart);
  const dispatch = useDispatch();
  const checkCart = () => {
    const r = cart?.filter((c) => c.id === id || c.item._id === id);
    return r ? r[0] : r;
  };
  const itemPresent = checkCart();
  const navigationHandler = () => {
    navigation.navigate("Cart");
  };
  const addToCartHandler = () => {
    dispatch({
      type: ADD_TO_CART,
      id,
      name,
      featuredImage,
      pricePerUnit,
      quantity,
      variant,
    });
  };
  return (
    <Pressable
      style={styles.btn}
      onPress={itemPresent ? navigationHandler : addToCartHandler}
    >
      <Text style={styles.text}>
        {itemPresent ? "View Cart" : "Add To Cart"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 2,
    borderRadius: 4,
    width: "90%",
    padding: 10,
    paddingHorizontal: 15,
    borderColor: primaryColor,
  },
  text: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
