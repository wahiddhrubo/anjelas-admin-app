import React from "react";
import { Pressable } from "react-native";
import { View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { primaryColor } from "../../lib/constant";
import { useNavigation } from "@react-navigation/native";
import { MotiView, useAnimationState } from "moti";
import { Alert } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DELETE_SINGLE_PRODUCT } from "../../store/saga/actions";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function ItemList({ id, prices, name, categories, tags, img }) {
  const navigation = useNavigation();
  const [deleteProduct, setDeleteProduct] = useState();
  const dispatch = useDispatch();
  const animatedDivState = useAnimationState({
    from: {
      scaleY: 0,
      height: 0,
    },
    active: {
      scaleY: 1,
      height: "auto",
    },
  });
  const toggleDiv = () => {
    const curr = animatedDivState.current;
    console.log(curr);
    if (curr === "from") {
      animatedDivState.transitionTo("active");
    } else {
      animatedDivState.transitionTo("from");
    }
  };
  const deleteProductPermission = () =>
    Alert.alert(`Delete Product`, `${name} Will Be Deleted!!!`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => setDeleteProduct(true) },
    ]);

  useEffect(() => {
    if (deleteProduct) {
      dispatch({ type: DELETE_SINGLE_PRODUCT, id });
    }
  }, [deleteProduct]);
  return (
    <>
      <Pressable onPress={toggleDiv} style={styles.box}>
        <View>
          <Image
            style={styles.img}
            source={{ uri: img }}
            width={350}
            height={350}
          />
        </View>
        <View style={styles.textbox}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.price}>
            {prices.min} - {prices.max}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("UpdateItem", { id })}
          style={styles.btn}
        >
          <Entypo name="brush" size={24} color="white" />
        </Pressable>
      </Pressable>
      <MotiView state={animatedDivState} style={styles.animatedDiv}>
        <View style={styles.table}>
          <View>
            <Text style={styles.title}>Categories </Text>
          </View>
          <View style={{ width: "70%" }}>
            <Text style={styles.tableText}>{categories.join(" , ")} </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View>
            <Text style={styles.title}>Tags </Text>
          </View>
          <View style={{ width: "70%" }}>
            <Text style={styles.tableText}>{tags.join(" , ")} </Text>
          </View>
        </View>
        <Pressable style={styles.deleteBtn} onPress={deleteProductPermission}>
          <Text style={styles.deleteText}>Delete Product</Text>
        </Pressable>
      </MotiView>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  img: {
    width: 75,
    height: 75,
    resizeMode: "cover",
    borderRadius: 4,
  },
  textbox: {
    marginRight: "auto",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: primaryColor,
  },
  btn: {
    height: 48,
    width: 48,
    backgroundColor: "purple",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  animatedDiv: {
    backgroundColor: "white",
    padding: 8,
    transform: [{ scaleY: 0 }],
    height: 0,
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    // flexWrap: "wrap",
  },
  tableText: {
    lineHeight: 24,
  },
  deleteBtn: {
    width: "100%",
    backgroundColor: "tomato",
    padding: 8,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
