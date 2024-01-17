import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, createTheme } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";

const IndexScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView behavior="height" styles={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../image/logo.jpg")}
        style={styles.image}
      />
      <Button
        color="warning"
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        spacing={4}
        title="QR Code"
        onPress={() => navigation.navigate("QrScreen")}
      />
      <Button
        color="warning"
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        spacing={4}
        title="MapScreen"
        onPress={() => navigation.navigate("MapScreen")}
      />
      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        type="outline"
        title="Home"
        onPress={() => navigation.navigate("QrScreen")}
      />
    </KeyboardAvoidingView>
  );
};

export default IndexScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    alignItems: "center",
  },
  list: {
    width: "100",
    backgroundColor: "#000",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  inputContainer: {
    width: 300,

    justifyContent: "center",
    marginLeft: 60,
  },
  button: {
    width: 50,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "red",
  },
 image: {
    width: 190,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginVertical: 70,
    borderRadius:80
  },
});
