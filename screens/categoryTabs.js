import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CategoriesScreen from "./categories/categoriesScreen";
import SingleCategoryScreen from "./categories/singleCategory";

const Stack = createStackNavigator();
export default function CategoryTabs() {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="SingleCategory" component={SingleCategoryScreen} />
    </Stack.Navigator>
  );
}
