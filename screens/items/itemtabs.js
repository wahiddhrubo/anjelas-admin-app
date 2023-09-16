import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Items from "./items";
import SingleItem from "./singleItem";

const Tab = createBottomTabNavigator();

export default function ItemTabScreen({ navigation }) {
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
        <Tab.Screen name="Items" component={Items} />
        <Tab.Screen name="SingleItem" component={SingleItem} />
      </Tab.Navigator>
    </Pressable>
  );
}

const EmptyScreen = () => <View></View>;

const styles = StyleSheet.create({});
