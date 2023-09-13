import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StickyHeader from "../../../components/ui/stickyHeader";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/selectors";
import { GET_ORDERS } from "../../../store/saga/actions";
import OrderList from "../../../components/orders/list";

export default function Orders() {
  const { orders } = useSelector(getOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ORDERS });
  }, []);

  return (
    <View>
      <StickyHeader title={"Orders"} />
      <ScrollView style={styles.container}>
        {orders?.map((o) => (
          <OrderList
            key={o._id}
            id={o.uID}
            _id={o._id}
            items={o.items.reduce((prev, curr) => prev + curr.quantity, 0)}
            status={o.status}
            time={o.created_at}
            total={parseInt(o.total)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
