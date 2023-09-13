import * as Clipboard from "expo-clipboard";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { primaryColor } from "../../lib/constant";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function OrderList({ id, status, items, time, total, _id }) {
  const statusColor = {
    processing: "rgb(245 158 11)",
    delivered: "green",
    cancelled: "red",
  };
  const navigation = useNavigation();
  const dateString = time.split("T")[0].replace(/-/g, " ");
  const copyHandler = async () => await Clipboard.setStringAsync(id);
  return (
    <View style={style.container}>
      <View style={style.upperPart}>
        <View style={style.sections}>
          <View>
            <Text style={{ fontSize: 16, marginBottom: 4 }}>
              Order Id {"   "}
              <Text style={style.bold}>{id}</Text>{" "}
              <Pressable onPress={copyHandler}>
                <AntDesign name="copy1" size={16} color="purple" />
              </Pressable>
            </Text>
            <Text>{dateString}</Text>
          </View>
          <View>
            <Text
              style={{
                ...style.bold,
                color: statusColor[status],
                fontSize: 16,
              }}
            >
              {status}
            </Text>
          </View>
        </View>
        <View style={style.sections}>
          <View>
            <Text style={{ fontSize: 14 }}>
              <Text style={style.bold}> ৳{total}</Text> | {items} items
            </Text>
          </View>
        </View>
      </View>
      <View style={style.btnSection}>
        <Pressable
          style={style.btn}
          onPress={() => navigation.navigate("SingleOrder", { id: _id })}
        >
          <Text style={style.btnText}> Details</Text>
        </Pressable>
        <Pressable style={style.btn}>
          <Text style={style.btnText}>Reorder</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 1,
    borderRadius: 16,
    width: "100%",
    marginVertical: 8,
  },
  upperPart: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bold: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  sections: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  btnSection: {
    borderTopWidth: 2,
    borderColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    padding: 15,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    width: "50%",
  },
  btnText: {
    color: primaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
});
