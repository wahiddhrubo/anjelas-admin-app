import React from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import StickyHeader from "../../components/stickyHeader";

export default function Items({ navigation }) {
  return (
    <View>
      <StickyHeader title={"Home"} />
      <Pressable onPress={() => navigation.navigate("NewItem")}>
        <Text>Create New Item</Text>
      </Pressable>
    </View>
  );
}
