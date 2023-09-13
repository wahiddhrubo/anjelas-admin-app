import React, { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/selectors";
import { GET_CATEGORY_PRODUCTS } from "../../store/saga/actions";
import CategoryCard from "../../components/category/card";
import { Feather } from "@expo/vector-icons";
import StickyHeader from "../../components/ui/stickyHeader";

export default function SingleCategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const dispatch = useDispatch();
  const { categoryProducts } = useSelector(getProducts);
  useEffect(() => {
    dispatch({ type: GET_CATEGORY_PRODUCTS, category });
  }, [category]);
  return (
    <View>
      <StickyHeader title={category} />
      <ScrollView
        style={{ backgroundColor: "white" }}
        stickyHeaderHiddenOnScroll={false}
        StickyHeaderComponent={() => <StickyHeader category={category} />}
        stickyHeaderIndices={1}
      >
        <View style={styles.container}>
          {categoryProducts?.map((c) => (
            <CategoryCard
              key={c._id}
              title={c.name}
              review={c.ratingAvg}
              reviewsNo={c.reviewsNo}
              img={c.featuredImage.url}
              price={c.price.min}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    // flex: 0.2,
    width: "100%",
    flexDirection: "row",
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 220,
  },
});
