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
  name,
  variant,
  quantity,
  price,
}) {
  console.log({ price });
  return (
    <View style={style.container}>
      <View style={style.imgbox}>
        <View>
          <Image style={style.img} source={{ uri: img }} />
        </View>
        <View>
          <View style={style.titleBox}>
            <View>
              <Text style={style.imgTitle}>{name}</Text>
            </View>

            <Text style={style.price}>Tk {price}</Text>
          </View>
          <Text>
            {variant} <Text style={style.bold}>(x{quantity})</Text>
          </Text>
        </View>
      </View>
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
  titleBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "72%",
  },
  imgTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: primaryColor,
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
