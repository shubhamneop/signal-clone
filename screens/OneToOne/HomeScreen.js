import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import CustomListItem from "./CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../../firebase";
import {
  AntDesign,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs
          .filter((doc) => doc.id !== auth.currentUser.uid)
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
      );
    });
    return unsubscribe;
  }, []);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useLayoutEffect(() => {
    console.log("photo", auth?.currentUser?.photoURL);
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={() => signOutUser()}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialCommunityIcons
              name="view-list"
              size={24}
              color="black"
              onPress={() => navigation.navigate("Home")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName, photoURL) => {
    navigation.navigate("OneChat", {
      id,
      chatName,
      photoURL,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {users.map(({ id, data: { name, photoURL } }) => (
          <CustomListItem
            id={id}
            chatName={name}
            photoURL={photoURL}
            key={id}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
