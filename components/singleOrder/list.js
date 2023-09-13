import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { primaryColor } from "../../lib/constant";

export default function SingleOrderList({
  img,
  itemId,
  orderId,
  name,
  variant,
  quantity,
  status,
}) {
  const navigation = useNavigation();
  const navigator = () =>
    navigation.navigate("Review", { itemId, orderId, name, img });
  return (
    <View style={style.container}>
      <View style={style.imgbox}>
        <View>
          <Image style={style.img} source={{ uri: img }} />
        </View>
        <View>
          <Text style={style.imgTitle}>{name}</Text>
          <Text>
            {variant} <Text style={style.bold}>(x{quantity})</Text>
          </Text>
        </View>
      </View>
      <Pressable
        style={
          status === "delivered"
            ? style.btn
            : { ...style.btn, backgroundColor: "#8080801a" }
        }
        onPress={status === "delivered" && navigator}
      >
        <MaterialCommunityIcons
          name="fountain-pen"
          size={24}
          color={status === "delivered" ? primaryColor : "gray"}
        />
        <Text>Write A Review</Text>
        <AntDesign
          name="right"
          style={{ marginLeft: "auto" }}
          size={24}
          color={status === "delivered" ? "black" : "gray"}
        />
      </Pressable>
      <Pressable
        style={
          status === "delivered"
            ? style.btn
            : { ...style.btn, backgroundColor: "#8080801a" }
        }
      >
        <Ionicons
          name="alert-circle"
          size={24}
          color={status === "delivered" ? "red" : "gray"}
        />
        <Text>Report Issues</Text>
        <AntDesign
          name="right"
          size={24}
          style={{ marginLeft: "auto" }}
          color={status === "delivered" ? "black" : "gray"}
        />
      </Pressable>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 16,
  },
  imgbox: {
    backgroundColor: "#8080801a",
    flexDirection: "row",
    padding: 8,
    borderRadius: 8,
    gap: 16,
    alignItems: "center",
    marginVertical: 8,
  },
  img: {
    width: 75,
    height: 75,
    resizeMode: "cover",
  },
  imgTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  btn: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});
