import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getCart } from "../store/selectors";
import CartItem from "../components/cart/cartItem";
import StickyHeader from "../components/ui/stickyHeader";
import { primaryColor } from "../lib/constant";

export default function CartScreen({ navigation }) {
  const { items: cart, price } = useSelector(getCart);
  const navigate = () => navigation.navigate("Checkout");

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <StickyHeader title={"Cart"} />
      {cart.length === 0 ? (
        <View style={style.emptyCart}>
          <Text style={style.emptyCartText}>{"Nothing Added To Cart Yet"}</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cart}
            contentContainerStyle={style.container}
            renderItem={({ item }) => (
              <CartItem
                id={item.id || item._id}
                name={item.item.name}
                img={item.item.featuredImage.url || item.item.featuredImage}
                variant={item.variant}
                quantity={item.quantity}
                price={item.pricePerUnit}
              />
            )}
          />
          <Pressable onPress={navigate} style={style.btn}>
            <Text style={style.btnText}>Proceed To Checkout</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
  },
  btn: {
    backgroundColor: primaryColor,
    width: "80%",
    padding: 15,
    borderRadius: 150,
    position: "absolute",
    bottom: 15,
    left: "10%",
    right: "10%",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  emptyCartText: { textAlign: "center", fontSize: 16 },
});
