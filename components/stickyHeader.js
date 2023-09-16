import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StickyHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="black" />
      </Pressable>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    // flex: 0.2,
    width: "100%",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default StickyHeader;
