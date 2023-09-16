import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Orders from "./orders";
import SingleOrder from "./singleOrder";

const Tab = createBottomTabNavigator();

export default function OrderTabScreen({ navigation }) {
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
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="SingleOrder" component={SingleOrder} />
      </Tab.Navigator>
    </Pressable>
  );
}

const EmptyScreen = () => <View></View>;

const styles = StyleSheet.create({});
