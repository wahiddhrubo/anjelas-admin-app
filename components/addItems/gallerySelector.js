import { Feather, FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ImageBackground } from "react-native";

export default function GalleryImageSelector({
  setGalleryImageUris,
  galleryImageUris,
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
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });
      console.log();
      setGalleryImageUris(imgResponse.assets);
    }
  };
  const removeImage = (uri) => {
    const filtered = galleryImageUris.filter((g) => g.uri !== uri);
    setGalleryImageUris(filtered);
  };
  return (
    <>
      <Pressable onPress={imageSelectAndUploader} style={styles.imageSelector}>
        <Text>Select Gallery Image</Text>
        <FontAwesome name="image" size={24} color="purple" />
      </Pressable>
      <View style={styles.gallery}>
        {galleryImageUris?.map((g) => (
          <ImageBackground
            style={styles.galleryImage}
            key={g.uri}
            width={350}
            height={350}
            source={{ uri: g.uri }}
          >
            <Pressable onPress={() => removeImage(g.uri)} style={styles.icon}>
              <Feather name="x" size={24} color="white" />
            </Pressable>
          </ImageBackground>
        ))}
      </View>
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
    marginVertical: 22,
  },
  gallery: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  galleryImage: {
    width: 170,
    resizeMode: "cover",
    height: 170,
    marginVertical: 8,
    position: "relative",
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
