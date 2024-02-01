import { View, Text, StyleSheet, FlatList, Image, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from 'react-native-paper';

import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";


const Welcome = ({ navigation }) => {
 
  
  return (
    
    <KeyboardAvoidingView behavior="height" style={styles.container}>
          
      <StatusBar style="light" />

      {/* <ImageBackground source={require("../src/image/Orange.jpg")} resizeMode="cover" style={styles.backgroundImage}> */}

      <Image
        source={require("../src/image/white.jpg")}
        style={styles.image }
      />
      <Button
        mode="text" 
        textColor='#ffffff'
        theme={{roundness:5}}
        
        style={{
          
          width:300,
          marginHorizontal:50,
          marginTop :100,
          height:50,
          padding :0,
          alignContent:"center",
          
          
          }}
        onPress={() => navigation.navigate("Login")} 
      >START</Button>


      {/* </ImageBackground> */}




      {/*  */}
      
      <View style={styles.inputContainer}>
      {
      
      
      
      
  /* <ImageBackground source={'"../src/image/Background.jpg"'} resizeMode="cover" style={styles.backgroundImage}></ImageBackground> */}

      </View>

      {/*  */}
      

    </KeyboardAvoidingView>
  );
};

export default Welcome;
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#FEC337',
     flexDirection: 'column',

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
    
    justifyContent: 'center',
     width:300,
     height:300,
     alignContent:'center',
     justifyContent: "center",
     marginHorizontal:50,
     marginVertical:100,
    //  marginBottom:300,
    
  },
  backgroundImage:{
    width:400,
    height:720,
  }
});
