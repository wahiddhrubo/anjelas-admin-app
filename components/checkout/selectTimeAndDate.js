import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TIMES, primaryColor } from "../../lib/constant";

export default function TimeDateModal({
  time,
  setTime,
  date,
  setDate,
  modal,
  setModal,
}) {
  const nextFiveDays = [
    new Date(Date.now() + 86400000),
    new Date(Date.now() + 86400000 * 2),
    new Date(Date.now() + 86400000 * 3),
    new Date(Date.now() + 86400000 * 4),
    new Date(Date.now() + 86400000 * 5),
  ];
  console.log(
    date?.toString()?.split(" ")[2],
    nextFiveDays[1]?.toString()?.split("T")
  );
  const dateFormatter = (dt) =>
    new Intl.DateTimeFormat("bd", {
      dateStyle: "full",
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(dt);

  if (modal === "time") {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        style={styles.modal}
      >
        {TIMES.map((t) => (
          <Pressable
            key={t}
            onPress={() => {
              setTime(t);
              setModal("");
            }}
            style={{
              ...styles.options,
              ...(time === t && { backgroundColor: primaryColor }),
            }}
          >
            <Text
              style={{
                ...styles.optionsText,
                ...(time === t && { color: "white" }),
              }}
            >
              {t}
            </Text>
          </Pressable>
        ))}
        <View style={{ height: 50 }}></View>
      </ScrollView>
    );
  } else if (modal === "date") {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.shortModal}
      >
        {nextFiveDays.map((t) => (
          <Pressable
            key={t}
            onPress={() => {
              setDate(t);
              setModal("");
            }}
            style={{
              ...styles.options,
              ...(date?.toString()?.split(" ")[0] ===
                t?.toString()?.split(" ")[0] && {
                backgroundColor: primaryColor,
              }),
            }}
          >
            <Text
              style={{
                ...styles.optionsText,
                ...(date?.toString()?.split(" ")[0] ===
                  t?.toString()?.split(" ")[0] && { color: "white" }),
              }}
            >
              {dateFormatter(t)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: "absolute",
    padding: 15,
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    left: "5%",
    top: "5%",
    zIndex: 5,
  },
  shortModal: {
    flex: 1,
    position: "absolute",
    padding: 15,
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    left: "5%",
    top: "5%",
    zIndex: 5,
    paddingVertical: "40%",
  },
  options: {
    padding: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 0.4,
    borderRadius: 8,
  },
  optionsText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
