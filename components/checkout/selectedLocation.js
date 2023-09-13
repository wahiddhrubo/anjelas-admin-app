import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { primaryColor } from "../../lib/constant";

export default function SelectedLocation({ location, setChangeLocation }) {
  const { streetAddress, floorNo, apartmentNo, area, phone } = location;
  const address = `${
    floorNo ? `Floor ${floorNo}` : ""
  }, ${apartmentNo}, ${streetAddress}`;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={{ ...styles.text }}>{address}</Text>
        </View>
        <View>
          <Text style={{ ...styles.text, color: "black", fontWeight: "600" }}>
            {area}, Dhaka
          </Text>
        </View>
        <View>
          <Text style={{ ...styles.text, fontWeight: "600" }}>+880{phone}</Text>
        </View>
      </View>
      <Pressable style={styles.btn} onPress={() => setChangeLocation(true)}>
        <Text style={styles.btnText}>Change</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: primaryColor,
    marginVertical: 16,
  },
  textContainer: {
    width: "65%",
  },
  btn: {
    backgroundColor: primaryColor,
    padding: 8,
    paddingHorizontal: 25,
    borderRadius: 4,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  text: {
    color: "gray",
    // fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
});
