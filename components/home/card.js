import React, { useState } from "react";
import {
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MotiView, useAnimationState } from "moti";
import { primaryColor } from "../../lib/constant";
import CartBtn from "../ui/cartBtn";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/selectors";
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from "../../store/saga/actions";
import { useNavigation } from "@react-navigation/native";

export default function HomeCard({
  id,
  variant,
  img,
  title,
  reviewNo = 0,
  review = 0,
  price,
  skus,
}) {
  const animatedDivState = useAnimationState({
    from: {
      scaleY: 0,
    },
    active: {
      scaleY: 1,
      zIndex: 50,
    },
    inActive: {
      scaleY: 0,
    },
  });
  const { favourites } = useSelector(getUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favourited =
    favourites.findIndex((f) => f.id === id || f._id === id) !== -1;

  const favouriteHandler = () =>
    dispatch({
      type: ADD_FAVOURITE,
      id,
      name: title,
      featuredImage: img,
      skus,
      price,
    });

  const removeFavouriteHandler = () => dispatch({ type: REMOVE_FAVOURITE, id });
  const navigate = () => {
    navigation.navigate("SingleItem", { id });
  };
  return (
    <View style={style.card}>
      <ImageBackground source={{ uri: img }} style={style.image}>
        <MotiView state={animatedDivState} style={style.animatedDiv}>
          <Pressable
            title=""
            style={style.animatedDivTouch}
            onPress={() => {
              animatedDivState.transitionTo("from");
            }}
          >
            <CartBtn
              id={id}
              name={title}
              featuredImage={img}
              pricePerUnit={price}
              quantity={1}
              variant={variant}
            />
          </Pressable>
        </MotiView>
        <TouchableOpacity
          title=""
          style={style.touch}
          onPress={() => {
            animatedDivState.transitionTo("active");
          }}
        ></TouchableOpacity>
      </ImageBackground>
      <Pressable
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={navigate}
      >
        <Text style={style.title}>{title}</Text>
        <Pressable
          onPress={favourited ? removeFavouriteHandler : favouriteHandler}
        >
          <FontAwesome
            name={favourited ? "heart" : "heart-o"}
            size={24}
            color={primaryColor}
          />
        </Pressable>
      </Pressable>
      <View style={style.reviewPrice}>
        <Text style={style.price}>৳ {price}</Text>
        <Text style={style.text}>
          {review ? `${review} (${reviewNo})` : `0(0)`}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    width: 230,
    borderRadius: 20,
    padding: 12,
    height: "auto",
    backgroundColor: "#8080801a",
    marginRight: 15,
    paddingBottom: 25,
  },
  image: {
    width: "100%",
    borderRadius: 10,
    height: 230,
    resizeMode: "cover",
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 17,
    marginVertical: 8,
  },
  touch: {
    display: "flex",
    position: "absolute",
    zIndex: 10,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  animatedDiv: {
    margin: "auto",
    backgroundColor: "white",

    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  reviewPrice: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 8,
    justifyContent: "space-between",
  },
  price: {
    color: primaryColor,
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    color: "black",
    fontSize: 13,
  },
  animatedDivTouch: {
    // backgroundColor: "black",
    width: "100%",
    height: "100%",
    zIndex: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
