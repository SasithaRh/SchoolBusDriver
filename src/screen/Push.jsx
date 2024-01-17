import { View, Text, StyleSheet,Alert, FlatList,KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { SelectList } from "react-native-dropdown-select-list";


const Push = ({ navigation }) => {

  const [category, setCategory] = useState([""]);
  const [message, setmessage] = useState([]);
  const [user, setUser] = useState("");

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser.uid);
     
    } else {
      setUser(null);
    }
  });
 useEffect(() => {
    db.collection("DriverMessages")
      .onSnapshot((snapShot) =>
      setmessage(
          snapShot.docs.map((doc) => ({
           
            data: doc.data(),
          }))
        )
      );
  }, []); 
  const send = () =>{
    db.collection("Notification").add({
      notification:"all",
      date:new Date().getTime(),
      message:category,
      driverid:user
    })
    
Alert.alert("Message Successfully Sent")
     
  }


  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        styles={styles.container}
        keyboardVerticalOffset={230}
      >
        <StatusBar style="light" />

        <View style={styles.inputContainer}>
        <SelectList
            setSelected={setCategory}
            data={message.map(({ data }) => data.message)}
            placeholder={"Select Message"}
          />
          <Text>{user}</Text>
            <Button
        
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        spacing={4}
        
        mode="contained" 
        onPress={send}
      >Send</Button>
         
        </View>
       
      </KeyboardAvoidingView>

    
    
    </>
  );
};

export default Push;
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
    marginTop: 100,
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
});
