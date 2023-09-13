import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { categories, categoriesImages } from "../../lib/constant";

export default function CategoriesScreen({ navigation }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {categoriesImages.map((c) => (
          <Pressable
            onPress={() =>
              navigation.navigate("SingleCategory", { category: c.category })
            }
            style={styles.box}
            key={c.category}
          >
            <Image style={styles.image} source={c.uri} />
            <Text style={styles.text}>{c.category}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    padding: 20,
    marginBottom: 120,
  },
  box: {
    width: 165,
    marginVertical: 25,
  },
  image: {
    width: "100%",
    borderRadius: 20,
    height: 210,
    resizeMode: "cover",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 8,
  },
});
