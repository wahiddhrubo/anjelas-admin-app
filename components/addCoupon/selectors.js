import { Feather, FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export default function FirstAndFeaturedOrder({
  setFirstOrder,
  setFeaturedOrder,
  firstOrder,
  featuredOrder,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Pressable
        onPress={() => setFirstOrder(!firstOrder)}
        style={{
          ...styles.imageSelector,
          ...(firstOrder && { backgroundColor: "purple" }),
        }}
      >
        <FontAwesome
          name="image"
          size={24}
          color={!firstOrder ? "purple" : "white"}
        />
        <Text
          style={{
            fontWeight: "bold",
            ...(firstOrder && { color: "white" }),
          }}
        >
          First Order
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setFeaturedOrder(!featuredOrder)}
        style={{
          ...styles.imageSelector,
          ...(featuredOrder && { backgroundColor: "purple" }),
        }}
      >
        <FontAwesome
          name={featuredOrder ? "star" : "star-o"}
          size={24}
          color={!featuredOrder ? "purple" : "white"}
        />
        <Text
          style={{
            fontWeight: "bold",
            ...(featuredOrder && { color: "white" }),
          }}
        >
          Featured Order
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  imageSelector: {
    width: "48%",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderWidth: 1,
    borderColor: "purple",
    // justifyContent: "space-between",
    marginVertical: 16,
    alignContent: "center",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: 225,
    height: 225,
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  icon: {
    position: "absolute",
    backgroundColor: "purple",
    paddingHorizontal: 8,
    paddingVertical: 8,
    right: 0,
    top: 0,
    borderBottomLeftRadius: 10,
  },
});
