import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { primaryColor } from "../../lib/constant";
import { useDispatch } from "react-redux";
import SearchScreen from "./searchScreen";
import { GET_SEARCH_PRODUCTS } from "../../store/saga/actions";
const Tab = createBottomTabNavigator();
export default function SearchTabScreen({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_SEARCH_PRODUCTS, keyword });
  }, [keyword]);
  return (
    <Pressable
      style={{ position: "relative", flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.searchBar,
          header: ({}) => (
            <View style={styles.header}>
              <Pressable onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={32} color="black" />
              </Pressable>
              <Text style={styles.headerText}>Search</Text>
            </View>
          ),
        }}
      >
        <Tab.Screen
          name="gb"
          component={EmptyScreen}
          options={{
            tabBarButton: () => (
              <Pressable onPress={() => navigation.goBack()} style={styles.btn}>
                <Feather name="chevron-left" size={28} color={"black"} />
              </Pressable>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarButton: () => (
              <View style={styles.searchBox}>
                <TextInput
                  style={styles.keyboard}
                  autoFocus={true}
                  placeholder="Search"
                  onChangeText={(text) => setKeyword(text)}
                />
                <AntDesign
                  style={styles.searchBtn}
                  name="search1"
                  size={24}
                  color="black"
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </Pressable>
  );
}

const EmptyScreen = () => <View></View>;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    paddingTop: 30,
    // flex: 0.2,
    width: "100%",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    elevation: 2,
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBar: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    flexDirection: "row",
    width: "100%",
    height: 75,
    position: "absolute",
    bottom: 0,
    gap: 50,
  },
  searchBox: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: 10,
  },
  keyboard: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: "100%",
  },
  btn: {
    width: 25,
    justifyContent: "center",
    marginRight: 15,
  },
  searchBtn: {
    position: "absolute",
    top: 12,
    bottom: "0",
    right: 15,
    marginVertical: "auto",
  },
});
