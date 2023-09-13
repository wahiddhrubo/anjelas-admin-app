import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store/store";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./screens/search/searchScreenTab";
import LoginScreen from "./screens/loginScreen";
import Alert from "./components/ui/alert";
import BottomNavbar from "./components/nav/navigation";
import CartScreen from "./screens/cartScreen";
import SingleItem from "./screens/singleItem";
import CheckoutScreen from "./screens/checkoutScreen";
import AddAddress from "./screens/addAddress";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeTab"
          screenOptions={{ headerShown: false, backgroundColor: "white" }}
        >
          <Stack.Screen component={BottomNavbar} name="HomeTab" />
          <Stack.Screen component={SearchScreen} name="SearchTab" />
          <Stack.Screen component={LoginScreen} name="Login" />
          <Stack.Screen component={CartScreen} name="Cart" />
          <Stack.Screen component={CheckoutScreen} name="Checkout" />
          <Stack.Screen component={SingleItem} name="SingleItem" />
          <Stack.Screen component={AddAddress} name="AddAddress" />
        </Stack.Navigator>
        <Alert />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
});
