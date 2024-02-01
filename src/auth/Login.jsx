import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, text } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";

import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("")
        setPassword("")
        navigation.navigate("Home Screen");
      
      
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
     
    <StatusBar style="light" />
    <Image
      source={require("../image/familyOB.png")}
      style={styles.image}
    />
    
    <View style={styles.inputContainer}>
    

      <TextInput
            cursorColor="#00154E"
            activeOutlineColor="#00154E"
            
            
          
          style={{
            width: 310,
            marginHorizontal: 0,
            marginVertical: 0,
            backgroundColor:'#ffffff',
          }}
        label="Email"
        autoFocus
        type="email"
        mode="outlined"
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      
      <TextInput
        cursorColor="#00154E"
        activeOutlineColor="#00154E"
      style={{
        width: 310,
        marginHorizontal: 0,
        marginVertical: 0,
        marginTop:20,
        backgroundColor:'#ffffff',
        
      }}
       label="Password"
        type="password"
        mode="outlined"
        
        secureTextEntry
      
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
    </View>

    <Button
     mode="contained" 
     theme={{roundness:2}}
     textColor='#ffffff'
      style={{
        width: 300,
        marginHorizontal:60,
        marginVertical:10,
        marginTop:60,
        backgroundColor:'#00154E',
      

      }}
      spacing={4}
       
      onPress={signIn}
    >Login Driver</Button>
     
     <Button
     theme={{roundness:2}}
     textColor='#00154E'
      style={{
        width: 300,
        marginHorizontal: 60,
        marginVertical: 10,
        marginTop:0,
       
      }}
      
      
      onPress={() => navigation.navigate("Register Driver")}
    > Driver Register </Button>

    {/* <Button
      containerStyle={{
        width: 200,
        marginHorizontal: 100,
        marginVertical: 10,
      }}
      type="outline"
      title="Parent Register"
      onPress={() => navigation.navigate("Register Parent")}
    /> */}
  </KeyboardAvoidingView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 1,
    alignItems: "center",
  },

  
  list: {
    width: "100",
    backgroundColor: "#FFFFFF",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  inputContainer: {
    width: 350,

    justifyContent: "center",
    marginLeft: 40,
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
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    
  },
});
