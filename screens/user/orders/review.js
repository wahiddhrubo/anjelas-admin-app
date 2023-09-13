import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_REVIEW } from "../../../store/saga/actions";
import { getOrders } from "../../../store/selectors";
import { resetReview } from "../../../store/slice/order";
import { useState } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { primaryColor } from "../../../lib/constant";
import Rating from "../../../components/review/rating";
import StickyHeader from "../../../components/ui/stickyHeader";
import { errorAlert } from "../../../store/slice/alert";

export default function Review({ route, navigation }) {
  const dispatch = useDispatch();
  const { reviewSucess } = useSelector(getOrders);
  const { itemId, orderId, name, img } = route.params;

  const [comment, setComment] = useState();

  const [reviewList, setReviewList] = useState([
    {
      id: "Rider",
      review: 0,
    },
    {
      id: "Food Quality",
      review: 0,
    },
    {
      id: "Food Taste",
      review: 0,
    },
  ]);
  const emptyReviewHandler = () => {
    dispatch(errorAlert("Fill All Fields First"));
  };
  const emptyReview = reviewList.findIndex((r) => r.review === 0);
  const revParams = reviewList.map((r) => r.id);
  const rating = (
    reviewList.reduce((prev, rlst) => prev + rlst.review, 0) / 3
  ).toFixed(1);
  const reviewHandler = () => {
    dispatch({ type: POST_REVIEW, orderId, itemId, rating, comment });
  };

  useEffect(() => {
    if (reviewSucess) {
      dispatch(resetReview());
      navigation.goBack();
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <StickyHeader title={`Review`} />
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <View style={style.hero}>
          <View>
            <Image
              width={200}
              height={200}
              style={style.heroImg}
              source={{ uri: img }}
            />
          </View>
          <View>
            <View>
              <Text style={style.heroTitle}>Review</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, textTransform: "capitalize" }}>
                {name}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.ratingBox}>
          {revParams.map((prm) => (
            <Rating
              id={prm}
              setReviewList={setReviewList}
              reviewList={reviewList}
            />
          ))}
          <Text style={style.totalRating}>Total Rating: {rating}</Text>
        </View>
        <TextInput
          multiline
          numberOfLines={5}
          style={style.input}
          placeholder="Write a Review (Optional) "
        />
        <Pressable
          onPress={emptyReview !== -1 ? emptyReviewHandler : reviewHandler}
          style={
            emptyReview !== -1
              ? { ...style.btn, ...style.disableBtn }
              : style.btn
          }
          color={primaryColor}
        >
          <Text style={style.btnText}>Submit</Text>
        </Pressable>
        <View style={{ height: 160 }}></View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  hero: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    marginVertical: 24,
  },
  heroImg: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    borderRadius: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: primaryColor,
    padding: 16,
    textAlignVertical: "top",
    color: "black",
  },
  ratingBox: {
    marginVertical: 16,
  },
  totalRating: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 24,
  },
  btn: {
    padding: 16,
    backgroundColor: primaryColor,
    marginVertical: 16,
  },
  disableBtn: {
    backgroundColor: "gray",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
