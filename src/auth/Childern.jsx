import { View, Text, StyleSheet,Alert, FlatList,KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { SelectList } from "react-native-dropdown-select-list";

const Childern = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [category, setCategory] = useState([""]);
  const [ss, setSs] = useState([]);
  const [QRcode, setQRcode] = useState("default");
  const [driver, setDriver] = useState("");

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setDriver(authUser.uid);
     
    } else {
      setDriver(null);
    }
  });

  db.collection("Parent")
    .orderBy("name", "asc")
    .onSnapshot((snapShot) =>
      setSs(
        snapShot.docs.map((doc) => ({
          key: doc.id,
          data: doc.data(),
        }))
      )
    );

  const register = () => {
    
        db.collection("children").add({
          parentId: category,
          name: name,
          age: age,
          grade: grade,
          mattendance: false,
          eattendance:false,
          driverid:driver
        })
        Alert.alert('Child added Successfully');
        setAge("")
        setGrade("")
        setName("")
        
     

  };

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
            data={ss.map(({ key, data }) => key)}
            placeholder={"Select Parent"}
          />
          <TextInput
            placeholder="Full Name"
            autoFocus
            type="text"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />

          <TextInput
            placeholder="Age"
            value={age}
            type="text"
            onChangeText={(text) => {
              setAge(text);
            }}
          />
          <TextInput
            placeholder="Grade"
            value={grade}
            type="text"
            onChangeText={(text) => {
              setGrade(text);
            }}
          />
          
        </View>
      </KeyboardAvoidingView>

      <Button
       
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        spacing={4}
        onPress={register}
        mode='outlined'
      >Register</Button>
   
    </>
  );
};

export default Childern;
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
