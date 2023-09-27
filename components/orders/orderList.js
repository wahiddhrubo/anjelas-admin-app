import * as Clipboard from "expo-clipboard";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { primaryColor } from "../../lib/constant";
import { Modal } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_ORDER_STATUS } from "../../store/saga/actions";
import { updateOrderStatus } from "../../store/saga/handlers/orders";

export default function OrderList({ id, status, items, time, total, _id }) {
  const statusColor = {
    processing: "rgb(245 158 11)",
    delivered: "green",
    cancelled: "red",
  };
  const statuses = ["processing", "delivering", "delivered"];

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dateString = time.split("T")[0].replace(/-/g, " ");
  const copyHandler = async () => await Clipboard.setStringAsync(id);
  const [openModal, setOpenModal] = useState(false);
  const updatedStatusHandler = (status) => {
    dispatch({ type: UPDATE_ORDER_STATUS, id, status });
    setOpenModal(false);
  };
  return (
    <View style={style.container}>
      <Modal visible={openModal}>
        <Pressable onPress={() => setOpenModal(false)} style={style.modalStyle}>
          <View>
            {statuses.map((s) => (
              <Pressable onPress={() => updatedStatusHandler(s)}>
                <Text key={s} style={style.modalopts}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
      <View style={style.upperPart}>
        <View style={style.sections}>
          <View>
            <Text style={{ fontSize: 16, marginBottom: 4 }}>
              Order Id : {"   "}
              <Text style={style.bold}>{`${id.slice(0, 3)}...${id.slice(
                -4
              )}`}</Text>{" "}
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
        <Pressable style={style.btn} onPress={() => setOpenModal(true)}>
          <Text style={style.btnText}>Change Status</Text>
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
    position: "relative",
  },
  modalStyle: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    // backgroundColor: "black",
  },
  modalopts: {
    fontSize: 19,
    fontWeight: "bold",
    marginVertical: 8,
    width: "100%",
    textAlign: "center",
    textTransform: "capitalize",
  },

  modalText: {},
});
