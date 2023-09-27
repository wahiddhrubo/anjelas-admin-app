import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOAD_USER } from "../../store/saga/actions";
import BottomNavbar from "./bottomNav";
import { getUser } from "../../store/selectors";

const HomeTabs = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(getUser);
  useEffect(() => {
    dispatch({ type: LOAD_USER });
  }, []);
  useEffect(() => {
    if (user) {
      return;
    }
    navigation.navigate("Login");
  }, [user]);

  return <BottomNavbar navigation={navigation} />;
};

export default HomeTabs;
