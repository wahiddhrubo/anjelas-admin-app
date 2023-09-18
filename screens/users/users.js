import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/selectors";
import { LOAD_ALL_USER } from "../../store/saga/actions";
import UserList from "../../components/users/userList";
import { ScrollView } from "react-native";
import StickyHeader from "../../components/stickyHeader";
import { StyleSheet } from "react-native";

export default function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector(getUser);
  useEffect(() => {
    dispatch({ type: LOAD_ALL_USER });
  }, []);

  return (
    <>
      <StickyHeader title={"Users"} />
      <ScrollView style={styles.container}>
        {users.map((u) => (
          <UserList
            email={u.email}
            location={u.homeLoc?.area}
            name={u.username}
            phone={u.phone}
            key={u._id}
          />
        ))}
        <View style={{ height: 90 }}></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
});
