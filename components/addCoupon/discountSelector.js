import React from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import { primaryColor } from "../../lib/constant";

export default function DiscountTypeSelector({
  setModal,
  discountType,
  setDiscountType,
  modal,
}) {
  const discountTypes = ["Flat Discount", "Percent Discount"];

  return (
    <Pressable style={styles.container} onPress={() => setModal(true)}>
      <Modal visible={modal}>
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            {discountTypes.map((t) => (
              <Pressable
                key={t}
                onPress={() => {
                  setDiscountType(t.toLowerCase().split(" ").join("-"));
                  setModal(false);
                }}
                style={{
                  ...styles.options,
                  ...(discountType === t.toLowerCase().split(" ").join("-") && {
                    backgroundColor: primaryColor,
                  }),
                }}
              >
                <Text
                  style={{
                    ...styles.optionsText,
                    ...(discountType ===
                      t.toLowerCase().split(" ").join("-") && {
                      color: "white",
                    }),
                  }}
                >
                  {t}
                </Text>
              </Pressable>
            ))}
            <View style={{ height: 50 }}></View>
          </View>
        </View>
      </Modal>

      <Text style={{ textTransform: "capitalize" }}>
        {!discountType
          ? "Select Discount Type"
          : discountType.split("-").join(" ")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 18,
    width: "100%",
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "purple",
  },
  cat: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "purple",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    borderRadius: 16,
  },
  catTxt: {
    color: "white",
    fontSize: 16,
  },
  modalBg: {
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    flexDirection: "row",
    zIndex: 5,
  },
  modal: {
    padding: 15,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    marginVertical: "auto",
  },

  options: {
    padding: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 0.4,
    borderRadius: 8,
    marginVertical: 24,
    width: "100%",
  },
  optionsText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
