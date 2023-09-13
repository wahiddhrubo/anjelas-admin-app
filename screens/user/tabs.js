import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RequestDish from "./requestDish";
import Favourites from "../favourites";
import Address from "./address";
import Users from "./users";
import OrderTabs from "./orders/tabs";

const Stack = createStackNavigator();

export default function UserTabs() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="User"
    >
      <Stack.Screen component={Users} name="User" />
      <Stack.Screen component={RequestDish} name="RequestDish" />
      <Stack.Screen component={OrderTabs} name="OrderTabs" />
      <Stack.Screen component={Address} name="Address" />
    </Stack.Navigator>
  );
}
