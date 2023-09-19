import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store/store";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/loginScreen";
import Alert from "./components/alert";
import HomeTabs from "./components/nav/nav";
import Newitem from "./screens/newitem";
import UpdateItem from "./screens/updateItem";
import UpdateCoupon from "./screens/updateCoupon";
import AddCoupon from "./screens/addCoupon";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName=""
          screenOptions={{ headerShown: false, backgroundColor: "white" }}
        >
          <Stack.Screen component={LoginScreen} name="Login" />
          <Stack.Screen component={HomeTabs} name="HomeTabs" />
          <Stack.Screen component={Newitem} name="NewItem" />
          <Stack.Screen component={UpdateItem} name="UpdateItem" />
          <Stack.Screen name="UpdateCoupon" component={UpdateCoupon} />
          <Stack.Screen name="NewCoupon" component={AddCoupon} />
        </Stack.Navigator>
      </NavigationContainer>
      <Alert />
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
