import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Pressable, StyleSheet, View } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import ItemTabScreen from "../../screens/items/itemtabs";
import OrderTabScreen from "../../screens/orders/orderTabs";
import CouponTabScreen from "../../screens/coupons/couponTabs";
import UserTabScreen from "../../screens/users/userTabs";
import { primaryColor } from "../../lib/constant";
import { LOGOUT } from "../../store/saga/actions";

const Tab = createBottomTabNavigator();

const BottomNavbar = ({ navigation }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: style.container,
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        headerShown: false,
      }}
      tabBarStyle={style.container}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              color={focused ? "purple" : "black"}
              size={32}
            />
          ),
          tabBarButton: ({ children, onPress }) => (
            <Pressable style={style.link} onPress={onPress}>
              {children}
            </Pressable>
          ),
        }}
        name="Home"
        component={ItemTabScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "truck-fast" : "truck-fast-outline"}
              color={focused ? "purple" : "black"}
              size={24}
            />
          ),
          tabBarButton: ({ children, onPress }) => (
            <Pressable style={style.link} onPress={onPress}>
              {children}
            </Pressable>
          ),
        }}
        name="OrderTabs"
        component={OrderTabScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "ticket-percent" : "ticket-percent-outline"}
              color={focused ? "purple" : "black"}
              size={24}
            />
          ),
          tabBarButton: ({ children, onPress }) => (
            <Pressable style={style.link} onPress={onPress}>
              {children}
            </Pressable>
          ),
        }}
        name="CouponTabs"
        component={CouponTabScreen}
      />
      <Tab.Screen
        options={{
          tabBarButton: ({ children, onPress }) => (
            <Pressable style={style.link} onPress={onPress}>
              {children}
            </Pressable>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-alt"
              size={24}
              color={focused ? "purple" : "black"}
            />
          ),
        }}
        name="UserTabs"
        component={UserTabScreen}
      />

      <Tab.Screen
        options={{
          tabBarButton: ({ children, onPress }) => (
            <Pressable style={style.link} onPress={logoutHandler}>
              {children}
            </Pressable>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="logout" size={24} color="black" />
          ),
        }}
        name="hjn"
        component={EmptyScreen}
      />
    </Tab.Navigator>
  );
};

const EmptyScreen = () => {
  return <View></View>;
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    flexGrow: 0,
    justifyContent: "space-between",
    alignContent: "center",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    padding: 5,
    height: 90,
  },
  customBtn: {
    backgroundColor: "purple",
    height: 75,
    width: 75,
    borderRadius: 5000,
  },
  link: {
    width: 68,
    borderRadius: 5000,
  },
});

export default BottomNavbar;
