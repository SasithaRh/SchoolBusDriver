import { View, Text,StyleSheet,Alert,FlatList } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../../firebase/firebase';
import {  db } from '../../firebase/firebase'


const RegisterDriver = ({navigation}) => {

  const [name,setName] =useState("");
  const [email,setEmail] =useState("");
  const [contact,setContact] =useState("");
  const [address,setAddress] =useState("");
  const [busNo,setBusNo] =useState("");
  const [rootDetails,setRootDetails] =useState("");
  const [password,setPassword] =useState("");
  
 const register =()=>{
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    const user = authUser.user;
    db.collection('Driver').doc(user.uid).set({
      name:name,
      email:email,
      contact:contact,
      address:address,
      busNo:busNo,
      rootDetails:rootDetails,
      location: {
        latitude: "",
        longitude: "",
      },
      role: "driver",
      userid:user.uid
    }) 
    navigation.navigate("Login Driver")
  }).catch((error)=>alert(error.message));
}

  return (
    <>
    <KeyboardAvoidingView behavior='padding' styles={styles.container} keyboardVerticalOffset={230}>
        <StatusBar style='light' />
      
        <View style={styles.inputContainer}>
           <TextInput 
           placeholder='Full Name'
           autoFocus
           type="text"
           value={name}
           onChangeText={(text)=>{setName(text)}}
           />
          <TextInput 
           placeholder='Email'
           value={email}
           type="email"
           onChangeText={(text)=>{setEmail(text)}}
           />
          <TextInput 
           placeholder='Contact No'
           value={contact}
           type="text"
           onChangeText={(text)=>{setContact(text)}}
           />
          <TextInput 
           placeholder='Address'
           value={address}
           type="text"
           onChangeText={(text)=>{setAddress(text)}}
           />
          <TextInput 
           placeholder='Bus No'
           value={busNo}
           type="text"
           onChangeText={(text)=>{setBusNo(text)}}
           />
          <TextInput 
           placeholder='Root Details'
           value={rootDetails}
           type="text"
           onChangeText={(text)=>{setRootDetails(text)}}
           />
          <TextInput 
           placeholder='Password'
           value={password}
           type="password"
           secureTextEntry
           onChangeText={(text)=>{setPassword(text)}}
         
           />
          
          
        </View>
      
    </KeyboardAvoidingView>
        

      <Button color="warning"  
         containerStyle={{
         width: 200,
         marginHorizontal: 100,
         marginVertical: 10,
         }} spacing={4}   mode='outlined' onPress={register}
         >Register</Button>
      <Button containerStyle={{
         width: 200,
         marginHorizontal: 100,
         marginVertical: 10,
         }} mode='outlined'   onPress={()=>navigation.navigate("Login Driver")}
         >Login</Button>
    </>
  )
}

export default RegisterDriver;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:'center'
  },
    list: {
      width: '100',
      backgroundColor: '#000',
    },
    item: {
      aspectRatio: 1,
      width: '100%',
      flex: 1,
    },
    inputContainer:{
      width:300,
      marginTop:50,
      justifyContent:'center',
      marginLeft:60,
      
    },
    button:{
      width:50,
      marginTop:10,
      alignItems:'center',
      
    },
    text:{
      color:'red',
      textDecorationLine:'none'
    }
    });


 