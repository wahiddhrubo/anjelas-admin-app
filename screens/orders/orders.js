import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GET_ORDERS } from "../../store/saga/actions";
import OrderList from "../../components/orders/orderList";
import { getOrders } from "../../store/selectors";
import StickyHeader from "../../components/stickyHeader";
import { FlatList } from "react-native";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector(getOrders);
  useEffect(() => {
    dispatch({ type: GET_ORDERS });
  }, []);
  return (
    <View>
      <StickyHeader title={"Orders"} />
      <FlatList
        data={orders}
        style={{ paddingHorizontal: 18 }}
        renderItem={({ item }) => (
          <OrderList
            key={item._id}
            id={item._id}
            _id={item._id}
            items={item.items.reduce((prev, curr) => prev + curr.quantity, 0)}
            status={item.status}
            time={item.created_at}
            total={parseInt(item.total)}
          />
        )}
      />
    </View>
  );
}
