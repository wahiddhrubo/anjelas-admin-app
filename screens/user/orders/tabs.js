import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Orders from "./orders";
import SingleOrder from "./singleOrder";
import Review from "./review";

const Stack = createStackNavigator();
export default function OrderTabs() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="SingleOrder" component={SingleOrder} />
      <Stack.Screen name="Review" component={Review} />
    </Stack.Navigator>
  );
}
