import { View, Text,StyleSheet,Alert,FlatList,ScrollView } from 'react-native'
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
  const [nic,setNic] =useState("");
  const [address,setAddress] =useState("");
  const [busNo,setBusNo] =useState("");
  const [rootDetails,setRootDetails] =useState("");
  const [password,setPassword] =useState("");
  
 const register =()=>{
  if (name == "" || email == "" || contact == "" || nic == "" || address == "" || busNo == "" || rootDetails == "" || password == "") {
    Alert.alert("All the feilds are rquired")
  }
  else {
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    const user = authUser.user;
    db.collection('Driver').doc(user.uid).set({
      name:name,
      email:email,
      contact:contact,
      nic:nic,
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
    navigation.navigate("Login")
  }).catch((error)=>alert(error.message));
}
 }
  return (
    <>
     
       
     
        <View style={styles.container}>
        {/* <KeyboardAvoidingView behavior='padding' style={styles.container} > */}
          <ScrollView>
           <TextInput 
           cursorColor="#00154E"
          activeUnderlineColor='#00154E'
            style={{
              width: 320,
              marginHorizontal: 0,
              marginVertical: 0,
              marginTop:0,
              backgroundColor:'#ffffff',
            }}
            mode="flat"
           placeholder='Full Name'
           autoFocus
           type="text"
           value={name}
           onChangeText={(text)=>{setName(text)}}
           />
          <TextInput 
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop:10,
            backgroundColor:'#ffffff',
          }}
          mode="flat" 
          placeholder='Email'
           value={email}
           type="email"
           onChangeText={(text)=>{setEmail(text)}}
           />
          <TextInput 
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop:10,
            backgroundColor:'#ffffff',
          }}
          mode="flat" 
          placeholder='Contact No'
           value={contact}
           keyboardType = 'number-pad'

           onChangeText={(text)=>{setContact(text)}}
           />
              <TextInput 
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop:10,
            backgroundColor:'#ffffff',
          }}
          mode="flat" 
          placeholder='NIC'
           value={nic}
           type="text"
           onChangeText={(text)=>{setNic(text)}}
           />
          <TextInput 
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop:10,
            backgroundColor:'#ffffff',
          }}
          mode="flat" 
          placeholder='Address'
           value={address}
           type="text"
           onChangeText={(text)=>{setAddress(text)}}
           />
          <TextInput
          cursorColor="#00154E"
          activeUnderlineColor='#00154E' 
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop:10,
            backgroundColor:'#ffffff',
          }}
          mode="flat" 
          placeholder='Bus No'
           value={busNo}
           type="text"
           onChangeText={(text)=>{setBusNo(text)}}
           />
          <TextInput 
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop:10,
            backgroundColor:'#ffffff',
          }}
          mode="Flat" 
          placeholder='Root Details'
           value={rootDetails}
           type="text"
           onChangeText={(text)=>{setRootDetails(text)}}
           />
          <TextInput
          cursorColor="#00154E"
          activeUnderlineColor='#00154E' 
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop:10,
            backgroundColor:'#ffffff',
          }}
          mode="flat" 
          placeholder='Password'
           value={password}
           type="password"
           secureTextEntry
           onChangeText={(text)=>{setPassword(text)}}
         
           />
           <View style={styles.container}>
               <Button   
        theme={{roundness:2}}
        style={{
          width: 280,
         
          marginVertical:0,
         
          backgroundColor:'#00154E',
        }}
         spacing={4}   mode='contained' onPress={register}
         >Register</Button>

      <Button 
      theme={{roundness:2}}
      style={{
         width: 280,
        

         }} mode='text' textColor='#00154E'  onPress={()=>navigation.navigate("Login")}
         >Login</Button>
         </View>
          </ScrollView>
      
    {/* </KeyboardAvoidingView> */}
          </View>
    
    
    </>
  )
}

export default RegisterDriver;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 15,
    marginTop:40,
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
     
     
      
    },
    text:{
      color:'red',
      textDecorationLine:'none'
    }
    });


 