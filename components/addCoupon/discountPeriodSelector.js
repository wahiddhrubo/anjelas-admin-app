import React from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import { primaryColor } from "../../lib/constant";
import { useState } from "react";

export default function DiscountPeriodSelector({
  day,
  setDay,
  period,
  setPeriod,
}) {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saterday",
    "sunday",
  ];
  const periods = ["daily", "weekly", "monthly"];

  const [dayModal, setDayModal] = useState(false);
  const [periodModal, setPeriodModal] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.box} onPress={() => setPeriodModal(true)}>
        <Modal visible={periodModal}>
          <View style={styles.modalBg}>
            <View style={styles.modal}>
              {periods.map((t) => (
                <Pressable
                  key={t}
                  onPress={() => {
                    setPeriod(t.toLowerCase().split(" ").join("-"));
                    setPeriodModal(false);
                  }}
                  style={{
                    ...styles.options,
                    ...(period === t.toLowerCase().split(" ").join("-") && {
                      backgroundColor: primaryColor,
                    }),
                  }}
                >
                  <Text
                    style={{
                      ...styles.optionsText,
                      ...(period === t.toLowerCase().split(" ").join("-") && {
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
          {!period ? "Select Period" : period.split("-").join(" ")}
        </Text>
      </Pressable>
      {period === "weekly" && (
        <Pressable style={styles.box} onPress={() => setDayModal(true)}>
          <Modal visible={dayModal}>
            <View style={styles.modalBg}>
              <View style={styles.modal}>
                {days.map((t) => (
                  <Pressable
                    key={t}
                    onPress={() => {
                      setDay(t.toLowerCase().split(" ").join("-"));
                      setDayModal(false);
                    }}
                    style={{
                      ...styles.options,
                      ...(day === t.toLowerCase().split(" ").join("-") && {
                        backgroundColor: primaryColor,
                      }),
                    }}
                  >
                    <Text
                      style={{
                        ...styles.optionsText,
                        ...(day === t.toLowerCase().split(" ").join("-") && {
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
            {!day ? "Select Day" : day.split("-").join(" ")}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 18,
    width: "45%",
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
    textTransform: "capitalize",
  },
});
