import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Coupons from "./coupons";
import SingleCoupon from "./singleCoupon";

const Tab = createBottomTabNavigator();

export default function CouponTabScreen({ navigation }) {
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
        <Tab.Screen name="Coupons" component={Coupons} />
        <Tab.Screen name="SingleCoupon" component={SingleCoupon} />
      </Tab.Navigator>
    </Pressable>
  );
}

const EmptyScreen = () => <View></View>;

const styles = StyleSheet.create({});
