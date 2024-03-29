import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Input, Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";
import firebase from "firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [logo, setLogo] = useState(require("../assets//android-icon.png"));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add new chat",
      headerBackTitle: "Chat",
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={<AntDesign name="wechat" size={24} color="black" />}
      />
      <Button disabled={!input} onPress={createChat} title="Create new Chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
