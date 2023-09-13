import { View } from "moti";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { primaryColor } from "../lib/constant";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../store/saga/actions";
import { useEffect } from "react";
import { getUser } from "../store/selectors";

import { Feather, Ionicons } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(getUser);
  const loginHandler = () => {
    dispatch({ type: LOGIN, email, password });
  };
  useEffect(() => {
    if (user) {
      navigation.goBack();
    }
  }, [user]);
  const goBackHandler = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={style.container}>
        <Pressable style={style.goBackBtn} onPress={goBackHandler}>
          <View>
            <Feather
              name="chevron-left"
              style={{ marginHorizontal: 8 }}
              size={32}
              color="black"
            />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("HomeTab")}>
          <Image
            resizeMode="contain"
            style={style.image}
            source={require("../assets/logo.png")}
            width={250}
            height={80}
          />
        </Pressable>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={style.input}
          keyboardType="email-address"
          placeholder="Email Address"
        />
        <View style={style.passwordInput}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            style={style.passInput}
            secureTextEntry={!showpassword}
            placeholder="Password"
          />
          <Pressable onPress={() => setShowPassword(!showpassword)}>
            <Ionicons
              name={showpassword ? "eye-off" : "eye"}
              size={24}
              style={style.passwordBtn}
              color={showpassword ? primaryColor : "black"}
            />
          </Pressable>
        </View>
        <Pressable onPress={loginHandler} style={style.btn}>
          <Text style={style.btnText}>Login</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: "white",
  },
  image: {
    width: 250,
    height: 80,
    resizeMode: "cover",
    marginBottom: 32,
  },
  input: {
    borderRadius: 4,
    padding: 12,
    marginVertical: 12,
    borderColor: primaryColor,
    width: "100%",
    borderWidth: 1,
  },
  btn: {
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: primaryColor,
    width: "100%",
    justifyContent: "center",
    padding: 16,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  goBackBtn: {
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    top: 32,
    left: 12,
    width: 55,
    height: 55,
    // backgroundColor: "#8080801a",
    borderRadius: 500,
  },
  passwordInput: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 4,
  },

  passwordBtn: {
    position: "absolute",
    top: 12,
    bottom: "0",
    right: 15,
    marginVertical: "auto",
  },
  passInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: "100%",
  },
});
