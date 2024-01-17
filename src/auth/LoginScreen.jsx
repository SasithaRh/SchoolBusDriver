import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";

import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setEmail("")
        setPassword("")
        navigation.navigate("DriverHome");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView behavior="height" styles={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../image/logo.jpg")}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        
        <TextInput
          label="Email"
          autoFocus
          type="email"
          mode="outlined"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        
        <TextInput
         label="Password"
          type="password"
          mode="outlined"
          secureTextEntry
          right={<TextInput.Affix text="/10" />}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>

      <Button
       
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        spacing={4}
        mode="contained" 
        onPress={signIn}
      >Login Driver</Button>
       <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained"
        
        onPress={() => navigation.navigate("Register Driver")}
      > Driver Register </Button>

 
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
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
