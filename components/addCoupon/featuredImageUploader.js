import { Feather, FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import { ImageBackground } from "react-native";

export default function CouponFeaturedImageUploader({
  setFeaturedImageUris,
  featuredImageUri,
}) {
  const [permissionStatus, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const imageSelectAndUploader = async () => {
    if (permissionStatus.canAskAgain && permissionStatus.status !== "granted") {
      await requestPermission();
    }
    if (permissionStatus.status === "granted") {
      const imgResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      setFeaturedImageUris(imgResponse.assets[0]);
    }
  };
  return (
    <>
      <Pressable onPress={imageSelectAndUploader} style={styles.imageSelector}>
        <Text>Select Featured Image</Text>
        <FontAwesome name="image" size={24} color="purple" />
      </Pressable>
      {featuredImageUri ? (
        <View style={styles.imageBox}>
          <ImageBackground
            source={{ uri: featuredImageUri.uri }}
            style={styles.image}
            width={350}
            height={175}
          >
            <Pressable onPress={() => removeImage(g.uri)} style={styles.icon}>
              <Feather name="x" size={24} color="white" />
            </Pressable>
          </ImageBackground>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageSelector: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderWidth: 1,
    borderColor: "purple",
    justifyContent: "space-between",
    marginVertical: 16,
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
