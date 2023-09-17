import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import StickyHeader from "../../components/stickyHeader";
import { useDispatch, useSelector } from "react-redux";
import { GET_HOME_PRODUCTS } from "../../store/saga/actions";
import { getProducts } from "../../store/selectors";
import { ScrollView } from "react-native";
import ItemList from "../../components/items/itemList";

export default function Items({ navigation }) {
  const dispatch = useDispatch();
  const { homeProducts } = useSelector(getProducts);
  useEffect(() => {
    dispatch({ type: GET_HOME_PRODUCTS });
  }, []);

  return (
    <View>
      <StickyHeader title={"Home"} />
      <ScrollView style={styles.container}>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("NewItem")}
        >
          <Text style={styles.btnText}>Create New Item</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Search A Item</Text>
        </Pressable>
        {homeProducts?.map((h) => (
          <ItemList
            categories={h.category}
            id={h._id}
            img={h.featuredImage.url}
            name={h.name}
            prices={h.price}
            tags={h.tags}
            key={h._id}
          />
        ))}
        <View style={{ height: 160 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  btn: {
    backgroundColor: "purple",
    width: "100%",
    padding: 8,
    marginVertical: 4,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});
