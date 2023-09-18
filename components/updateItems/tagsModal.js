import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { categories, primaryColor } from "../../lib/constant";
import { Text } from "react-native";

export default function TagsModal({ tag, setTag, modal, setModal }) {
  if (modal === true) {
    return (
      <View style={styles.modalBg}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          style={styles.modal}
        >
          {categories
            .filter((c) => !tag.includes(c))
            .map((t) => (
              <Pressable
                key={t}
                onPress={() => {
                  setTag([...tag, t]);
                  setModal(false);
                }}
                style={{
                  ...styles.options,
                  ...(tag === t && { backgroundColor: primaryColor }),
                }}
              >
                <Text
                  style={{
                    ...styles.optionsText,
                    ...(tag === t && { color: "white" }),
                  }}
                >
                  {t}
                </Text>
              </Pressable>
            ))}
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    position: "absolute",
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",

    zIndex: 5,
  },
  modal: {
    padding: 15,
    width: "90%",
    height: "90%",
    backgroundColor: "white",
  },
  shortModal: {
    flex: 1,
    position: "absolute",
    padding: 15,
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    left: "5%",
    top: "5%",
    zIndex: 5,
    paddingVertical: "40%",
  },
  options: {
    padding: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 0.4,
    borderRadius: 8,
  },
  optionsText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
