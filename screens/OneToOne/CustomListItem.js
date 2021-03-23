import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { db, auth } from "../../firebase";

const CustomListItem = ({ id, chatName, photoURL, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  const chatID = () => {
    const chatterID = auth.currentUser.uid;
    const chateeID = id;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    return chatIDpre.join("_");
  };
  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .doc(chatID())
      .collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatMessages(snapshot.docs.map((doc) => doc.data()));
      });
    return unsubscribe;
  }, []);

  const getUnReadCout = () => {
    const count = chatMessages.filter((x) => x.read == false);
    return count.length;
  };

  return (
    <ListItem
      onPress={() => enterChat(id, chatName, photoURL)}
      key={id}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri:
            photoURL ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontWeight: chatMessages?.[0]?.read == false ? "bold" : "normal",
          }}
        >
          {chatMessages?.[0]?.displayName}{" "}
          {chatMessages?.[0] ? ":" : "No message..."}{" "}
          {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
      {chatMessages?.[0]?.read == false ? (
        chatMessages?.[0]?.id == auth.currentUser.uid ? null : (
          <Badge value={getUnReadCout()} style={styles.badge} />
        )
      ) : null}
      <ListItem.Chevron color="black" />
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  badge: {
    position: "relative",
    right: 0,
    left: "75%",
  },
});
