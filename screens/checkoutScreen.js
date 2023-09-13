import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getCoupon, getUser } from "../store/selectors";
import Coupon from "../components/checkout/coupon";
import { DELIVERY_CHARGE, TAX_RATE, primaryColor } from "../lib/constant";
import StickyHeader from "../components/ui/stickyHeader";
import LocationSelector from "../components/checkout/locationSelector";
import { useEffect } from "react";
import { GET_LOCATION } from "../store/saga/actions";
import { useState } from "react";
import SelectedLocation from "../components/checkout/selectedLocation";
import SelectTimeAndDate from "../components/checkout/selectTimeAndDate";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { getPriceAndQuantity } from "../store/slice/cart";
import { useNavigation } from "@react-navigation/native";

export default function CheckoutScreen() {
  const { price } = useSelector(getCart);
  const { total: couponTotal } = useSelector(getCoupon);
  const { user } = useSelector(getUser);
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [modal, setModal] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({});
  const [newTotal, setNewTotal] = useState();
  const [changeLocation, setChangeLocation] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigator = () => navigation.navigate("Login");

  useEffect(() => {
    dispatch({ type: GET_LOCATION });
    dispatch(getPriceAndQuantity());
  }, []);

  useEffect(() => {
    if (couponTotal) {
      setNewTotal(couponTotal);
    }
  }, [couponTotal]);

  const totalAmount = parseInt(price + DELIVERY_CHARGE + TAX_RATE * price);

  const dateFormatter = (dt) =>
    new Intl.DateTimeFormat("bd", {
      dateStyle: "full",
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(dt);

  return (
    <>
      {price === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>
            {"Nothing Added To Cart Yet"}
          </Text>
        </View>
      ) : !user ? (
        <View style={styles.noUserDiv}>
          <View style={styles.noUser}>
            <Text style={styles.emptyCartText}>{"You Haven't login yet"} </Text>
            <Pressable
              onPress={navigator}
              style={{ marginVertical: "auto", heught: "auto" }}
            >
              <Text
                style={{
                  ...styles.emptyCartText,
                  fontWeight: "bold",
                  color: primaryColor,
                }}
              >
                Login Now
              </Text>
            </Pressable>
            <Text style={styles.emptyCartText}>to place the order</Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <SelectTimeAndDate
            time={time}
            setTime={setTime}
            date={date}
            setDate={setDate}
            modal={modal}
            setModal={setModal}
          />
          <StickyHeader title={"Checkout"} />
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <Coupon totalAmount={totalAmount} />

            {changeLocation || Object.keys(selectedLocation).length === 0 ? (
              <LocationSelector
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                setChangeLocation={setChangeLocation}
              />
            ) : (
              <View>
                <SelectedLocation
                  location={selectedLocation}
                  setChangeLocation={setChangeLocation}
                />
                <Text style={styles.title}>
                  Pick Your Preferred Delivery Timings
                </Text>
                <Pressable
                  style={styles.input}
                  onPress={() => setModal("date")}
                >
                  <Text style={styles.inputText}>
                    {date ? dateFormatter(date) : "Select date"}
                  </Text>
                  <AntDesign name="calendar" size={24} color="black" />
                </Pressable>

                <Pressable
                  style={styles.input}
                  onPress={() => setModal("time")}
                >
                  <Text style={styles.inputText}>{time || "Select time"}</Text>
                  <AntDesign name="clockcircleo" size={24} color="black" />
                </Pressable>
              </View>
            )}
          </ScrollView>

          <Pressable style={styles.btn}>
            <Feather name="shopping-bag" size={24} color="white" />
            <Text style={styles.btnText}>Proceed To Pay</Text>
            <View style={styles.priceBtn}>
              <Text style={styles.priceText}>
                {newTotal ? <Text>৳ {newTotal}</Text> : `৳ ${totalAmount}`}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    width: "full",
    borderWidth: 1,
    borderColor: "purple",
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    color: "#1c4254",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  btn: {
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: "rgb(251 146 60)",
    padding: 15,
    width: "90%",
    marginLeft: "5%",
    marginBottom: 25,
    gap: 8,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  priceText: {
    display: "flex",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  priceBtn: {
    marginLeft: "auto",
    marginVertical: "auto",
    backgroundColor: "rgb(249 115 22)",
    padding: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  noUser: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "70%",
    marginHorizontal: "auto",
    justifyContent: "center",
  },
  noUserDiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 16,
    textTransform: "capitalize",
    lineHeight: 32,
  },
});
