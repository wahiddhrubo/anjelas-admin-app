import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";
import "react-native-gesture-handler";
import BottomNavbar from "./components/nav/bottomNav";

import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./screens/search/searchScreenTab";
import LoginScreen from "./screens/loginScreen";
import Alert from "./components/ui/alert";
import { useSelector } from "react-redux";
import {
  getCart,
  getCoupon,
  getOrders,
  getProducts,
  getSingleProduct,
  getUser,
} from "./store/selectors";
import LottieView from "lottie-react-native";

const Stack = createStackNavigator();

export default function Wrapper({}) {
  const { loading: loadingUser } = useSelector(getUser);
  const { loading: loadingProducts } = useSelector(getProducts);
  const { loading: loadingOrders } = useSelector(getOrders);
  const { loading: loadingSingleProduct } = useSelector(getSingleProduct);
  const { loading: loadingCoupon } = useSelector(getCoupon);
  const { loading: loadingCart } = useSelector(getCart);
  const loading =
    loadingUser ||
    loadingProducts ||
    loadingOrders ||
    loadingSingleProduct ||
    loadingCoupon ||
    loadingCart;

  console.log(!loading);
  return (
    <View>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeTab"
          screenOptions={{ headerShown: false, backgroundColor: "white" }}
        >
          <Stack.Screen component={BottomNavbar} name="HomeTab" />
          <Stack.Screen component={SearchScreen} name="Search" />
          {/* <Stack.Screen component={LoginScreen} name="Login" /> */}
        </Stack.Navigator>
      </NavigationContainer>
      <Alert />
    </View>
  );
}
