import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Pressable, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { primaryColor } from "../../lib/constant";
import { useEffect } from "react";

export default function Sku({ skus, setSkus, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSku = skus.filter((s) => s.sku === id)[0];
  const [name, setName] = useState(currentSku.name);
  const [price, setPrice] = useState(currentSku.price);
  const [serving, setServing] = useState(currentSku.serving);
  const submitHandler = () => {
    const filtered = skus.map((s) =>
      s.sku === id ? { ...s, name, price, serving } : s
    );
    setSkus([...filtered]);
    setIsOpen(false);
  };
  useEffect(() => {
    if (currentSku) {
      setName(currentSku.name);
      setPrice(currentSku.price);
      setServing(currentSku.serving);
    }
  }, [currentSku]);

  const removeSku = () => {
    const filtered = skus.filter((s) => s.sku !== id);
    setSkus(filtered);
  };
  const disabled = [name, price, serving];
  console.log(disabled);
  return (
    <Pressable onPress={() => setIsOpen(!isOpen && true)}>
      <View style={!isOpen && { display: "none" }}>
        <View style={{ marginVertical: 16 }}>
          <View style={styles.formTitleBox}>
            <Text style={styles.formTitle}>
              Sku - <Text style={{ fontWeight: "bold" }}> {id}</Text>
            </Text>
            <Pressable onPress={() => removeSku()}>
              <Feather name="x" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              placeholder="Name"
              value={name}
            />
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={(text) => setPrice(parseInt(text))}
              placeholder="Price"
              value={price}
            />
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={(text) => setServing(parseInt(text))}
              placeholder="Serving"
              value={serving}
            />
          </View>
          <Pressable
            style={styles.btn}
            onPress={disabled ? null : submitHandler}
          >
            <Text style={styles.btnText}>Add Price</Text>
          </Pressable>
        </View>
      </View>

      <View style={isOpen ? { display: "none" } : styles.box}>
        <View style={styles.titleBox}>
          <Text style={styles.boxTitle}>{name}</Text>
          <Pressable onPress={() => removeSku()}>
            <Feather name="x" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.priceDiv}>
          <Text style={styles.boxText}>
            <Text style={{ fontWeight: "bold" }}> {price} </Text>- {serving}{" "}
            Person
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "purple",
    // flexDirection: "row",
    padding: 16,
    marginVertical: 16,
  },
  priceDiv: {
    flexDirection: "row",
    gap: 8,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  titleBox: {
    marginVertical: 4,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  boxText: {
    fontSize: 16,
    color: "purple",
  },
  formTitle: {
    fontSize: 20,
  },
  formTitleBox: {
    marginVertical: 18,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  input: {
    width: "48%",
    padding: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: primaryColor,
    backgroundColor: "white",
    marginBottom: 16,
  },
  btn: {
    width: "35%",
    fontSize: 16,
    backgroundColor: "purple",
    borderRadius: 4,
    padding: 12,
    marginLeft: "auto",
  },
  btnText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
});
