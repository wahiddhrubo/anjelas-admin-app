import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../store/saga/actions";
import { CUSTOMER_PHONE_NUMBER } from "../../lib/config";
import {
  Ionicons,
  Entypo,
  Feather,
  MaterialIcons,
  Foundation,
} from "@expo/vector-icons";
import { primaryColor } from "../../lib/constant";
import { getUser } from "../../store/selectors";
import { useEffect } from "react";
export default function Users({ navigation }) {
  const navigator = (screen) => navigation.navigate(screen);
  const makeCall = () => Linking.openURL(`tel:${CUSTOMER_PHONE_NUMBER}`);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
  };
  useEffect(() => {
    if (!user) {
      navigation.navigate("HomeTab");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable
          style={styles.links}
          onPress={() => navigation.navigate("OrderTabs")}
        >
          <MaterialIcons
            name="delivery-dining"
            size={28}
            color={primaryColor}
          />
          <Text style={styles.linkText}>Orders</Text>
        </Pressable>
        <Pressable style={styles.links} onPress={() => navigator("Favourites")}>
          <Entypo name="heart" size={24} color="tomato" />
          <Text style={styles.linkText}>Favourites</Text>
        </Pressable>
        <Pressable style={styles.links} onPress={() => navigator("Address")}>
          <Foundation name="marker" size={24} color="darkblue" />
          <Text style={styles.linkText}>Your Saved Addresses</Text>
        </Pressable>
        <Pressable style={styles.links} onPress={() => navigator("DailyDeals")}>
          <Feather name="gift" size={24} color="purple" />
          <Text style={styles.linkText}>Daily Deals</Text>
        </Pressable>
        <Pressable style={styles.links} onPress={() => makeCall()}>
          <MaterialIcons name="call" size={28} color="purple" />
          <Text style={styles.linkText}>Customer Support</Text>
        </Pressable>
        <Pressable style={styles.links} onPress={logoutHandler}>
          <Feather name="log-out" size={24} color="black" />
          <Text style={styles.linkText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  links: {
    padding: 24,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
