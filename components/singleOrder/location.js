import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function OrderLocation({ location }) {
  return (
    <View style={style.container}>
      <Text style={style.title}>Delivery details</Text>
      <View style={style.location}>
        <FontAwesome5 name="home" size={24} color="black" />
        <View>
          <Text style={style.locationText}>
            {location.streetAddress},{location.area}
          </Text>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              +880{location.phone}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    gap: 24,
    marginVertical: 8,
  },
});
