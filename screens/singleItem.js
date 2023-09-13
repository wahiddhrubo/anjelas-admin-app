import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StickyHeader from "../components/ui/stickyHeader";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getSingleProduct } from "../store/selectors";
import { useEffect } from "react";
import {
  ADD_TO_CART,
  GET_SINGLE_PRODUCT,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART,
} from "../store/saga/actions";
import { useState } from "react";
import { primaryColor } from "../lib/constant";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function SingleItem({ route }) {
  const { id } = route.params;
  const [sku, setSku] = useState();
  const { item } = useSelector(getSingleProduct);
  const { items } = useSelector(getCart);
  const dispatch = useDispatch();
  const quantity = items.reduce(
    (prev, curr) =>
      (curr.id === id && curr.variant === sku?.name) ||
      (curr.item._id === id && curr.variant === sku?.name)
        ? curr.quantity + prev
        : prev,
    0
  );
  console.log(items);

  useEffect(() => {
    dispatch({ type: GET_SINGLE_PRODUCT, id });
  }, [id]);

  const increaseQuantity = () => {
    console.log(quantity);
    if (quantity) {
      dispatch({
        type: UPDATE_CART,
        id,
        quantity: quantity + 1,
        variant: sku.name,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        id,
        name: item.name,
        featuredImage: item.featuredImage.url,
        pricePerUnit: sku.price,
        quantity: 1,
        variant: sku.name,
      });
    }
  };
  const decreaseQuantity = () => {
    if (quantity === 1) {
      dispatch({ type: REMOVE_ITEM_FROM_CART, id, variant: sku.name });
      return;
    }
    dispatch({
      type: UPDATE_CART,
      id,
      quantity: quantity - 1,
      variant: sku.name,
    });
  };

  useEffect(() => {
    if (item.skus) {
      setSku(item.skus[0]);
    }
  }, [item]);

  console.log(items);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <StickyHeader title={item.name} />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.imgBox}>
          <Image
            style={styles.image}
            source={{ uri: item.featuredImage?.url }}
            width={250}
            height={250}
          />
        </View>

        {sku && (
          <View>
            <Text style={styles.price}>
              ৳ {sku.price} |
              <Text style={{ color: "gray", fontSize: 20 }}>
                {" "}
                {sku.serving} Person
              </Text>
            </Text>
            <View style={styles.variants}>
              {item.skus?.map((s) => (
                <Pressable
                  key={s.name}
                  style={{
                    ...styles.variantBox,
                    ...(sku === s && { backgroundColor: "purple" }),
                  }}
                  onPress={() => setSku(s)}
                >
                  <Text
                    style={{
                      ...styles.variantText,
                      ...(sku === s && { color: "white" }),
                    }}
                  >
                    {s.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        <Text style={{ lineHeight: 25, fontSize: 15 }}>{item.description}</Text>
        <View style={{ height: 150 }}></View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "white",
          bottom: 20,
          width: "90%",
          paddingHorizontal: 20,
          paddingVertical: 25,
          left: "5%",
          borderRadius: 15,
        }}
      >
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Buy Now</Text>
        </Pressable>
        {quantity ? (
          <View style={styles.updater}>
            <Pressable onPress={increaseQuantity} style={styles.updateBtn}>
              <Ionicons name="add-sharp" size={24} color="white" />
            </Pressable>

            <View>
              <Text style={styles.updateBtnText}>{quantity}</Text>
            </View>

            <Pressable onPress={decreaseQuantity} style={styles.updateBtn}>
              <AntDesign name="minus" size={24} color="white" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.updater}>
            <Pressable onPress={increaseQuantity} style={styles.updateBtn}>
              <Ionicons name="add-sharp" size={24} color="white" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  imgBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginHorizontal: "auto",
    borderRadius: 8,
    marginVertical: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  variants: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 16,
  },
  variantBox: {
    width: 100,
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "purple",
    backgroundColor: "white",
  },
  variantText: {
    textAlign: "center",
    color: "purple",
    fontSize: 16,
  },
  updater: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  updateBtn: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fe7500ec",
  },
  btn: {
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: primaryColor,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  updateBtnText: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
  },
});
