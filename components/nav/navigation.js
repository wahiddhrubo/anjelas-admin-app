import React from "react";
import { useDispatch } from "react-redux";
import MainBottomNavbar from "./bottom/main";
import { useEffect } from "react";
import { GET_CART, GET_FAVOURITE, LOAD_USER } from "../../store/saga/actions";
import {
  LocationAccuracy,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  useForegroundPermissions,
} from "expo-location";
import { useState } from "react";
import { updateUserLoc } from "../../store/slice/user";

const BottomNavbar = ({ navigation }) => {
  const dispatch = useDispatch();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const [userLoc, setUserLoc] = useState();

  const verifyPermission = async () => {
    console.log(locationPermissionInfo);
    if (locationPermissionInfo.status === "undetermined") {
      const permissionResponse = await requestPermission();
      console.log(permissionResponse);
      return permissionResponse.status;
    }
    if (
      locationPermissionInfo.status === "denied" &&
      locationPermissionInfo.canAskAgain === true
    ) {
      const permissionResponse = await requestPermission();
      console.log(permissionResponse);
      return permissionResponse.status;
    }
    if (locationPermissionInfo.status === "denied") {
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await verifyPermission();
    console.log(hasPermission);
    if (!hasPermission) {
      return;
    }
    try {
      const loc = await getCurrentPositionAsync();
      console.log(loc.coords);
      const locString = await reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      console.log(locString[0]);
      const { city, street, district } = locString[0];
      setUserLoc({
        area: district || city,
        streetAddress: `${street}`,
        latlong: loc.coords,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
    if (userLoc) {
      dispatch(updateUserLoc(userLoc));
    }
  }, [userLoc, locationPermissionInfo]);

  useEffect(() => {
    dispatch({ type: LOAD_USER });
    dispatch({ type: GET_FAVOURITE });
    dispatch({ type: GET_CART });
  }, []);

  return <MainBottomNavbar navigation={navigation} />;
};

export default BottomNavbar;
