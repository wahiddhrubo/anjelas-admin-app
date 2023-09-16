import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Users from "./users";
import SingleUser from "./singleUser";

const Tab = createBottomTabNavigator();

export default function UserTabScreen({ navigation }) {
  return (
    <Pressable
      style={{ position: "relative", flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tab.Screen name="Users" component={Users} />
        <Tab.Screen name="SingleUser" component={SingleUser} />
      </Tab.Navigator>
    </Pressable>
  );
}

const EmptyScreen = () => <View></View>;

const styles = StyleSheet.create({});
