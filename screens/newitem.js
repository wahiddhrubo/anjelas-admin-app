import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Sku from "../components/addItems/sku";
import StickyHeader from "../components/stickyHeader";
import { primaryColor } from "../lib/constant";
import CategorysModal from "../components/addItems/categoriesModal";
import CategorySelector from "../components/addItems/categorySelector";
import FeaturedImageUploader from "../components/addItems/featuredImageUploader";
import GalleryImageSelector from "../components/addItems/gallerySelector";
import { SingleImageUpload, galleryImageUpload } from "../axios/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PRODUCT } from "../store/saga/actions";
import { getProducts, getSingleProduct } from "../store/selectors";
import { useEffect } from "react";
import { resetSingleProductAddSuccess } from "../store/slice/singleProduct";
import TagsSelector from "../components/addItems/tagSelector";
import TagsModal from "../components/addItems/tagsModal";

export default function Newitem({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  const [featuredImageUri, setFeaturedImageUri] = useState();
  const [galleryImageUris, setGalleryImageUris] = useState([]);
  const [categoryModal, setCategoryModal] = useState();
  const [tagModal, setTagModal] = useState();
  const [skus, setSkus] = useState([]);

  const { singleProductAddSuccess } = useSelector(getSingleProduct);

  useEffect(() => {
    if (singleProductAddSuccess) {
      dispatch(resetSingleProductAddSuccess());
      navigation.navigate("HomeTabs");
    }
  }, [singleProductAddSuccess]);

  const createNewSkus = () => {
    const id = Math.floor(Math.random() * 1000);
    setSkus([...skus, { sku: id, name: "", serving: "", price: "" }]);
  };

  const emptySku = skus.reduce(
    (prev, curr) => prev || Object.values(curr).includes(""),
    false
  );
  const isDisabled =
    !name ||
    !description ||
    !stock ||
    !category.length ||
    !skus.length ||
    emptySku ||
    !featuredImageUri ||
    !galleryImageUris.length;

  const itemHandler = async () => {
    const featuredImage = await SingleImageUpload(featuredImageUri);
    const gallery = await galleryImageUpload(galleryImageUris);
    dispatch({
      type: ADD_PRODUCT,
      name,
      description,
      stock,
      gallery,
      featuredImage,
      categories: category,
      tags: tag,
      skus,
    });
  };
  console.log(isDisabled);
  return (
    <>
      <CategorysModal
        category={category}
        setCategory={setCategory}
        modal={categoryModal}
        setModal={setCategoryModal}
      />
      <TagsModal
        tag={tag}
        setTag={setTag}
        modal={tagModal}
        setModal={setTagModal}
      />

      <StickyHeader title={"New Item"} />
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <TextInput
            onChangeText={(text) => setName(text)}
            style={styles.inputHalf}
            placeholder="Name"
          />

          <TextInput
            onChangeText={(text) => setStock(parseInt(text))}
            style={styles.inputHalf}
            keyboardType="number-pad"
            placeholder="Stock"
          />
          <TextInput
            onChangeText={(text) => setDescription(text)}
            style={styles.inputFull}
            placeholder="Description"
            multiline={true}
            numberOfLines={8}
          />
          <CategorySelector
            category={category}
            setCategory={setCategory}
            setModal={setCategoryModal}
          />
          <TagsSelector setModal={setTagModal} setTags={setTag} tags={tag} />
          <FeaturedImageUploader
            setFeaturedImageUris={setFeaturedImageUri}
            featuredImageUri={featuredImageUri}
          />
          <View style={styles.skuSelector}>
            <Text style={styles.selectorTitle}>Add A Price</Text>
            <Pressable style={styles.icon} onPress={createNewSkus}>
              <AntDesign name="plus" size={24} color="white" />
            </Pressable>
          </View>
          {skus.map((s) => (
            <Sku id={s.sku} setSkus={setSkus} skus={skus} key={s.sku} />
          ))}
          <GalleryImageSelector
            galleryImageUris={galleryImageUris}
            setGalleryImageUris={setGalleryImageUris}
          />
        </View>
      </ScrollView>
      <Pressable
        style={
          isDisabled ? { ...styles.btn, backgroundColor: "gray" } : styles.btn
        }
        onPress={!isDisabled ? itemHandler : null}
      >
        <Text style={styles.btnText}>Add New Item</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  form: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
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
  inputHalf: {
    width: "45%",
    borderWidth: 1,
    borderColor: "purple",
    padding: 8,
    marginVertical: 8,
    backgroundColor: "white",
  },
  inputFull: {
    width: "100%",
    borderWidth: 1,
    borderColor: "purple",
    padding: 8,
    marginVertical: 8,
    backgroundColor: "white",
  },
  skuSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  icon: {
    width: 42,
    height: 42,
    backgroundColor: primaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "purple",
    padding: 15,
    marginBottom: 16,
    borderRadius: 100,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
