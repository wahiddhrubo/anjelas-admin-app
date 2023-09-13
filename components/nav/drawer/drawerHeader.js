import React from "react";
import { useSelector } from "react-redux";
import { getCart, getUser } from "../../../store/selectors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { primaryColor } from "../../../lib/constant";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DrawerHeader() {
  const { userLocation } = useSelector(getUser);

  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate("Cart");
  };
  const { items } = useSelector(getCart);

  const cartLength =
    items.length === 0
      ? 0
      : items.reduce((prev, curr) => prev + curr.quantity, 0);

  return (
    <View style={style.container}>
      <View>
        <Text style={style.text}>
          {userLocation.streetAddress.split("").splice(0, 10)},
        </Text>
        <View style={{ width: "100%" }}>
          <Text style={{}}>{userLocation.area}</Text>
        </View>
      </View>
      <Pressable onPress={navigate} style={style.cartBtn}>
        <View>
          <Ionicons name={"cart"} color="black" size={40} />
          <View style={style.cartBadge}>
            <Text style={style.cartText}>{cartLength}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 30,
    paddingBottom: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cartBtn: {
    position: "relative",
    marginRight: 16,
    // backgroundColor: "black",
  },
  cartBadge: {
    position: "absolute",
    bottom: 2,
    backgroundColor: primaryColor,
    right: -10,
    width: 25,
    height: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  cartText: {
    color: "white",
    fontSize: 16,
  },
});
