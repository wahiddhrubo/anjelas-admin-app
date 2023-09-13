import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { primaryColor } from "../../lib/constant";

export default function Rating({ id, reviewList, setReviewList }) {
  const updateReview = (id, review) => {
    const newArr = [...reviewList];
    const ind = newArr.findIndex((n) => n.id === id);
    newArr[ind]["review"] = review;
    setReviewList(newArr);
  };
  const increaseReview = (id, review) => {
    const newArr = [...reviewList];
    const ind = newArr.findIndex((n) => n.id === id);
    newArr[ind]["review"] += review;
    setReviewList(newArr);
  };
  const getSingleReview = (id) => {
    const newArr = [...reviewList];
    const ind = newArr.findIndex((n) => n.id === id);
    return newArr[ind]["review"];
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id} :</Text>
      <View style={styles.stars}>
        {[...Array(getSingleReview(id)).keys()].map((r, index) => (
          <Pressable key={index} onPress={() => updateReview(id, index + 1)}>
            <FontAwesome name="star" size={24} color={primaryColor} />
          </Pressable>
        ))}
        {[...Array(5 - getSingleReview(id)).keys()].map((r, index) => (
          <Pressable key={index} onPress={() => increaseReview(id, index + 1)}>
            <FontAwesome name="star" size={24} color="gray" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 24,
    marginVertical: 8,
    // justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
});
