import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GET_COUPON } from "../../store/saga/actions";
import { DELIVERY_CHARGE, primaryColor } from "../../lib/constant";

export default function Coupon({ totalAmount }) {
  const [code, setCode] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const dispatch = useDispatch();
  const couponHandler = () => {
    dispatch({
      type: GET_COUPON,
      code,
      totalAmount,
      deliveryCharge: DELIVERY_CHARGE,
    });
  };
  return (
    <View>
      <View>
        <Pressable
          onPress={() => setInputMode(!inputMode)}
          style={styles.textIcon}
        >
          <Text style={styles.text}>Have A Coupon? Apply Now</Text>
          <AntDesign
            name={inputMode ? "up" : "down"}
            size={24}
            color={primaryColor}
          />
        </Pressable>
        {inputMode ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCode(text)}
              placeholder="Enter Special Coupon"
            />
            <Pressable style={styles.btn} onPress={couponHandler}>
              <Text style={styles.btnText}>Apply</Text>
            </Pressable>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  input: {
    padding: 8,
    width: "70%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "purple",
  },
  btn: {
    padding: 12,
    paddingHorizontal: 28,
    backgroundColor: "purple",
    borderRadius: 4,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    fontSize: 18,
  },
  textIcon: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
});
