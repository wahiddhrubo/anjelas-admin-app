import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StickyHeader from "../components/ui/stickyHeader";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { getUser } from "../store/selectors";
import FavouriteCard from "../components/favourite/card";

export default function Favourites() {
  const { favourites } = useSelector(getUser);
  const getSmallestSku = (item) => item.skus.sort((a, b) => a - b)[0];
  console.log(favourites);
  return (
    <View>
      <StickyHeader title={"Favourites"} />
      <ScrollView>
        <View style={styles.container}>
          {favourites.map((f) => (
            <FavouriteCard
              img={f.featuredImage?.url || f.featuredImage}
              price={getSmallestSku(f).price}
              variant={getSmallestSku(f).name}
              skus={f.skus}
              title={f.name}
              key={f._id || f.id}
              id={f._id || f.id}
            />
          ))}
        </View>
        <View style={{ height: 220 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
