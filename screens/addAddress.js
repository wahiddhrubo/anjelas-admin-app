import React from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { getUser } from "../store/selectors";
import { useState } from "react";
import StickyHeader from "../components/ui/stickyHeader";
import MapView from "react-native-maps";

export default function AddAddress() {
  const { user, userLocation } = useSelector(getUser);
  const [address, setAddress] = useState(userLocation.street);
  const [floor, setFloor] = useState();
  const [apartment, setApartment] = useState();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [area, setArea] = useState(userLocation.area);
  console.log(user);

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <StickyHeader title={"Add Address"} />

      <MapView
        style={{ flex: 0.5, width: "100%" }}
        initialRegion={{
          latitude: userLocation.latlong.latitude,
          longitude: userLocation.latlong.longitude,
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }}
        minZoomLevel={10}
      ></MapView>
      <View style={style.container}>
        <TextInput
          style={style.input}
          onChangeText={(text) => setAddress(text)}
          value={address}
          placeholder="Address"
        />
        <Pressable style={style.input}>
          <Text>{area || "Area"}</Text>
        </Pressable>
        <TextInput
          style={{ ...style.input, width: "45%" }}
          onChangeText={(text) => setFloor(text)}
          value={floor}
          placeholder="Floor No."
        />
        <TextInput
          style={{ ...style.input, width: "45%" }}
          onChangeText={(text) => setApartment(text)}
          value={apartment}
          placeholder="Apartment"
        />
        <TextInput
          style={style.input}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Name"
        />

        <TextInput
          style={style.input}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          placeholder="Phone Number"
          keyboardType="number-pad"
        />
      </View>
      <View></View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  input: {
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 8,
    width: "100%",
  },
});
