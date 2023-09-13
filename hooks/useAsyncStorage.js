import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAsyncStorage(collection) {
  const getItem = async () => {
    try {
      const value = await AsyncStorage.getItem(collection);
      if (value !== null) {
        return JSON.parse(value);
      }
      if (value === null) {
        await AsyncStorage.setItem(collection, JSON.stringify([]));
      }
      return [];
    } catch (e) {
      console.log(e);
    }
  };

  const addItem = async (item) => {
    const json = JSON.stringify([item]);
    try {
      const value = await AsyncStorage.getItem(collection);
      if (value !== null) {
        const newValue = JSON.parse(value);
        newValue.push(item);
        const newJson = JSON.stringify(newValue);
        await AsyncStorage.setItem(collection, newJson);
      }
      if (value === null) {
        await AsyncStorage.setItem(collection, json);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const addCartItem = async (item) => {
    let value = await AsyncStorage.getItem(collection);
    value = JSON.parse(value);
    const { id, variant, quantity } = item;
    const match = value?.findIndex((i) => i.id === id && i.variant === variant);
    if (match >= 0) {
      value[match].quantity = value[match].quantity + parseInt(quantity);
    } else {
      value = value ? [...value, item] : [item];
    }
    console.log(value);
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(collection, json);
  };

  const updateItem = async (item) => {
    let value = await AsyncStorage.getItem(collection);
    value = JSON.parse(value);

    const { id, quantity, variant } = item;
    const match = value?.findIndex((i) => i.id === id && i.variant === variant);
    if (quantity > 0) {
      value[match].quantity = parseInt(quantity);
    } else {
      value = value.filter((i) => i.id === id);
    }

    const json = JSON.stringify(value);
    await AsyncStorage.setItem(collection, json);
  };
  const clearItem = async (id) => {
    try {
      const value = await AsyncStorage.getItem(collection);
      if (value !== null) {
        let newValue = JSON.parse(value);
        newValue = newValue.filter((v) => v.id !== id);
        await AsyncStorage.setItem(collection, JSON.stringify(newValue));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return [getItem, addItem, clearItem, updateItem, addCartItem];
}
