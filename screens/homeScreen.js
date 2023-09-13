import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import HomeSections from "../components/home/section";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_HOME_PRODUCTS } from "../store/saga/actions";
import { useState } from "react";
import { getProducts } from "../store/selectors";
import DrawerHeader from "../components/nav/drawer/drawerHeader";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { homeProducts: sections, loading } = useSelector(getProducts);
  useEffect(() => {
    dispatch({ type: GET_HOME_PRODUCTS });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <DrawerHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {sections?.map((s) => (
          <HomeSections key={s.title} item={s} />
        ))}
        <View style={{ height: 365 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    // marginBottom: 120,
  },
});
