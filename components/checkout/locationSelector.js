import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getUser } from "../../store/selectors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { primaryColor } from "../../lib/constant";
import { useNavigation } from "@react-navigation/native";
import CheckoutLocationList from "./locationList";
export default function LocationSelector({
  selectedLocation,
  setSelectedLocation,
  setChangeLocation,
}) {
  const { user, locations } = useSelector(getUser);
  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate("AddAddress");
  };
  return (
    <View>
      <View style={styles.btnContainer}>
        <View style={styles.btns}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={24}
            color="black"
          />
          <Text style={styles.btnText}>Choose delivery address</Text>
        </View>
        <Pressable onPress={navigate} style={styles.navBtn}>
          <Ionicons name="add-sharp" size={18} color="purple" />
          <Text style={styles.navBtnText}>Add New</Text>
        </Pressable>
      </View>
      {locations.map((l) => (
        <CheckoutLocationList
          key={l._id}
          location={l}
          selectedLocation={selectedLocation}
          setChangeLocation={setChangeLocation}
          setSelectedLocation={setSelectedLocation}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btns: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginRight: "auto",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navBtnText: {
    fontSize: 14,
    color: "purple",
  },
  navBtn: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    // backgroundColor: "purple",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 2,
    marginLeft: "auto",
    marginVertical: 8,
  },
});
