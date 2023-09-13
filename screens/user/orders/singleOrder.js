import React, { useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/selectors";
import { GET_SINGLE_ORDERS } from "../../../store/saga/actions";
import StickyHeader from "../../../components/ui/stickyHeader";
import { AntDesign } from "@expo/vector-icons";
import SingleOrderList from "../../../components/singleOrder/list";
import * as Clipboard from "expo-clipboard";
import OrderLocation from "../../../components/singleOrder/location";

export default function SingleOrder({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { order } = useSelector(getOrders);
  useEffect(() => {
    dispatch({ type: GET_SINGLE_ORDERS, id });
  }, [id]);
  const statusColor = {
    processing: "rgb(245 158 11)",
    delivered: "green",
    cancelled: "red",
  };

  return (
    <View style={{ flex: 1, paddingBottom: 235 }}>
      {order && (
        <View>
          <StickyHeader title={`Order ${order.uID.toUpperCase()}`} />
          <ScrollView style={styles.container}>
            <View style={styles.hero}>
              <View>
                <Image
                  width={200}
                  height={200}
                  style={styles.heroImg}
                  source={require("../../../assets/delivery.png")}
                />
              </View>
              <View>
                <View>
                  <Text style={styles.heroTitle}>
                    Order{"  "}
                    <Text style={{ color: statusColor[order.status] }}>
                      {order.status}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 14 }}>
                    Order Id{"   "}
                    <Text style={{ ...styles.bold, ...styles.uid }}>
                      {order.uID}{" "}
                    </Text>
                    <Pressable
                      onPress={() => Clipboard.setStringAsync(order.uID)}
                    >
                      <AntDesign name="copy1" size={16} color="purple" />
                    </Pressable>
                  </Text>
                </View>
              </View>
            </View>
            <View>
              {order.items?.map((i) => (
                <SingleOrderList
                  key={i._id}
                  img={i.item.featuredImage.url}
                  itemId={i.item._id}
                  name={i.item.name}
                  orderId={order._id}
                  quantity={i.quantity}
                  variant={i.variant}
                />
              ))}
            </View>
            <View>
              <OrderLocation location={order.location} />
            </View>
            <View style={styles.totalDiv}>
              <Text style={styles.totalDivText}>
                Total: {"  "}
                <Text style={{ color: statusColor[order.status] }}>
                  {parseInt(order.total)}
                </Text>
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
  },
  hero: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
  heroImg: {
    width: 125,
    height: 125,
    resizeMode: "contain",
  },
  bold: {
    fontWeight: "bold",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  uid: {
    textTransform: "uppercase",
  },
  totalDiv: {
    padding: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  totalDivText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
