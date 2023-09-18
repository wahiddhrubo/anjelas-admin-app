import React from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";
export default function TagsSelector({ setModal, tags, setTags }) {
  const removeTags = (selected) => {
    const filtered = tags.filter((c) => c !== selected);
    setTags(filtered);
  };
  return (
    <Pressable style={styles.container} onPress={() => setModal(true)}>
      {tags.map((c) => (
        <View style={styles.cat}>
          <Text style={styles.catTxt}>{c}</Text>
          <Pressable onPress={() => removeTags(c)}>
            <Feather name="x" size={24} color="white" />
          </Pressable>
        </View>
      ))}
      <Text>{!tags.length && "Select Tags"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 18,
    width: "100%",
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "purple",
    // justifyContent: "center",
  },
  cat: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "purple",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    borderRadius: 16,
  },
  catTxt: {
    color: "white",
    fontSize: 16,
  },
});
