import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from 'react-native-paper';

import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";

const HomeScreen = ({ navigation }) => {
 
  return (
    <KeyboardAvoidingView behavior="height" styles={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../src/image/logo.jpg")}
        style={styles.image}
      />
      <View style={styles.inputContainer}></View>

      <Button
        mode="contained"
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        spacing={4}
       

        onPress={() => navigation.navigate("Login Driver")}
      >Login as Driver</Button>
      

    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
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
