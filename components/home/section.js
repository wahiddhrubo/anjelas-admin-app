import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import HomeCard from "./card";

export default function HomeSections({ item }) {
  const { title, data } = item;
  const getSmallestSku = (item) => item.skus.sort((a, b) => a - b)[0];
  return (
    <View style={style.container}>
      <View style={style.titleBar}>
        <Text style={style.title}>{title}</Text>
        <Pressable>
          <Text style={style.btn}>Show More</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <HomeCard
            key={item._id}
            id={item._id}
            variant={getSmallestSku(item).name}
            img={item.featuredImage.url}
            title={item.name}
            review={item.ratingAvg}
            price={getSmallestSku(item).price}
            skus={item.skus}
          />
        )}
        style={{ flexGrow: 0 }}
        horizontal={true}
        rowWrapperStyle={{ flex: 1, alignItems: "center" }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: 25,
  },
  titleBar: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
  },
  btn: {
    fontSize: 21,
    fontWeight: "bold",
  },
});
