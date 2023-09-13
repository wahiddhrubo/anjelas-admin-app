import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getProducts } from "../../store/selectors";
import SearchCard from "../../components/search/card";
import { Feather } from "@expo/vector-icons";

export default function SearchScreen({ navigation }) {
  const { searchProducts } = useSelector(getProducts);
  const getSmallestSku = (item) => item.skus.sort((a, b) => a - b)[0];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        // style={{ flex: 1 }}
        data={searchProducts}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <SearchCard
            key={item._id}
            id={item._id}
            title={item.name}
            review={item.ratingAvg}
            reviewsNo={item.reviewsNo}
            img={item.featuredImage.url}
            variant={getSmallestSku(item).name}
            price={getSmallestSku(item).name}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    // flex: 0.2,
    width: "100%",
    // flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    // flexDirection: "row",

    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 220,
    numColumns: 2,
  },
});
