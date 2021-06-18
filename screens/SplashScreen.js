import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";
import { auth } from "../firebase";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const [logo, setLogo] = useState(require("../assets/android-icon.png"));

  useEffect(() => {
    Promise.all([
      setTimeout(() => {
        setAnimating(false);
        auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            navigation.replace("OneChatHome");
          } else {
            navigation.replace("Login");
          }
        });
      }, 5000),
    ]).then(function (results) {});
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ActivityIndicator
        animating={animating}
        color="#845EC2"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 100,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
