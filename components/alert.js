import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import { getAlert } from "../store/selectors";
import { resetAlert } from "../store/slice/alert";
import { primaryColor } from "../lib/constant";

let interval = 0;

export default function Alert() {
  const { type, text } = useSelector(getAlert);
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (true) {
      interval = setInterval(() => {
        setProgress((progress) => progress + 1);
      }, 20);
    }
  }, [text]);

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(interval);
      dispatch(resetAlert());
      setProgress(0);
    }
  }, [progress]);

  return (
    <View style={{ justifyContent: "center" }}>
      {text ? (
        <View
          style={{
            backgroundColor:
              type === "error" ? "color: rgb(185 28 28)" : "rgb(22 163 74)",
            ...styles.container,
          }}
        >
          {type === "error" ? (
            <MaterialIcons name="error-outline" size={38} color="red" />
          ) : (
            <Feather name="check-circle" size={38} color="green" />
          )}
          <Text style={styles.text}> {text}</Text>
          <View
            style={{
              height: 5,
              backgroundColor: type === "error" ? "red" : "green",
              width: `${progress * 1.5}%`,
              position: "absolute",
              left: 0,
              bottom: 0,
            }}
          ></View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    display: "flex",
    position: "absolute",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    right: "5%",
    left: "5%",
    marginHorizontal: "auto",
    bottom: 50,
    zIndex: 500,
    borderWidth: 1,
    borderRadius: 16,
    padding: 25,
    backgroundColor: "white",
    width: "90%",
    borderColor: primaryColor,
  },
  text: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 18,
    marginVertical: "auto",
  },
});
