import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
export default function CheckoutLocationList({
  setSelectedLocation,
  location,
  selectedLocation,
  setChangeLocation,
}) {
  console.log(location);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setSelectedLocation(location !== selectedLocation ? location : {});
        setChangeLocation(false);
      }}
    >
      <View>
        <Ionicons
          name={
            selectedLocation === location
              ? "ios-radio-button-on-sharp"
              : "ios-radio-button-off-sharp"
          }
          size={24}
          color="purple"
        />
      </View>
      <View>
        <Text style={{ ...styles.text, ...styles.streetAddress }}>
          {location.streetAddress}
        </Text>
        <Text style={styles.text}>{location.area}, Dhaka</Text>
      </View>

      <View style={styles.icon}>
        {location.type === "normal" ? (
          <FontAwesome5 name="map-marker-alt" size={18} color="purple" />
        ) : (
          <FontAwesome
            name={location.type === "work" ? "building" : "home"}
            size={18}
            color="purple"
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    gap: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "purple",
    alignItems: "center",
    marginVertical: 16,
  },
  streetAddress: {
    color: "gray",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  icon: {
    marginLeft: "auto",
    marginBottom: "auto",
  },
});
