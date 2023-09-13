import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { Ionicons, Feather, FontAwesome, AntDesign } from "@expo/vector-icons";
import { primaryColor } from "../../../lib/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/selectors";
import HomeScreen from "../../../screens/homeScreen";
import SearchScreen from "../../../screens/search/searchScreenTab";
import CartScreen from "../../../screens/cartScreen";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LOGOUT } from "../../../store/saga/actions";
import CategoryTabs from "../../../screens/categoryTabs";
import { FontAwesome5 } from "@expo/vector-icons";
import UserTabs from "../../../screens/user/tabs";
import Favourites from "../../../screens/favourites";
const Tab = createBottomTabNavigator();

const MainBottomNavbar = ({ navigation }) => {
  const { user } = useSelector(getUser);
  const router = useRoute();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: style.container,
        tabBarActiveTintColor: primaryColor,
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
              color={focused ? primaryColor : "black"}
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
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "md-grid-outline"}
              color={focused ? primaryColor : "black"}
              size={24}
            />
          ),
          tabBarButton: ({ children, onPress }) => (
            <Pressable style={style.link} onPress={onPress}>
              {children}
            </Pressable>
          ),
        }}
        name="CategoriesTab"
        component={CategoryTabs}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              color={focused ? primaryColor : "white"}
              size={28}
            />
          ),
          tabBarButton: (props) => (
            <CustomBtn {...props} navigation={navigation} />
          ),
        }}
        name="srch"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name={focused ? "heart" : "hearto"}
              color={focused ? primaryColor : "black"}
              size={24}
            />
          ),
          tabBarButton: ({ children, onPress }) => (
            <Pressable style={style.link} onPress={onPress}>
              {children}
            </Pressable>
          ),
        }}
        name="Favourites"
        component={Favourites}
      />
      {!user ? (
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="log-in"
                color={focused ? primaryColor : "black"}
                size={28}
              />
            ),
            tabBarButton: ({ children }) => (
              <Pressable
                style={style.link}
                onPress={() => navigation.navigate("Login")}
              >
                {children}
              </Pressable>
            ),
          }}
          name="lgin"
          component={EmptyScreen}
        />
      ) : (
        <Tab.Screen
          options={{
            tabBarButton: ({ children, onPress }) => (
              <Pressable style={style.link} onPress={onPress}>
                {children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <FontAwesome5 name="user-alt" size={24} color="black" />
            ),
          }}
          name="UserTabs"
          component={UserTabs}
        />
      )}
    </Tab.Navigator>
  );
};

const EmptyScreen = () => {
  return (
    <View>
      <Text>Empty</Text>
    </View>
  );
};

const CustomBtn = ({ children, navigation }) => {
  return (
    <TouchableOpacity
      style={{ top: -40 }}
      onPress={() => navigation.navigate("SearchTab")}
    >
      <View style={style.customBtn}>{children}</View>
    </TouchableOpacity>
  );
};
const CustomLinkBtn = ({ children, navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        {children}
      </TouchableOpacity>
    </View>
  );
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
    backgroundColor: primaryColor,
    height: 75,
    width: 75,
    borderRadius: 5000,
  },
  link: {
    width: 68,
    borderRadius: 5000,
  },
});

export default MainBottomNavbar;
