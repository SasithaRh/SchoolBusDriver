import { View, Text, StyleSheet, Alert, FlatList, KeyboardAvoidingView } from "react-native";
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
  const [category, setCategory] = useState([]);

  
  const [ss, setSs] = useState([]);
  const [driver, setDriver] = useState("");
  const [school, setSchool] = useState("");

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setDriver(authUser.uid);

    } else {
      setDriver(null);
    }
  });
  useEffect(() => {
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
  }, [driver]);
 
  const register = () => {
    if (name == "" || age == "" || grade == "" || school == "") {
      Alert.alert("All the feilds are rquired")
    }
    // else if(age > 5 || age < 10){
    //   Alert.alert("Age should be between 5 to 10")
    // }
    else {
      db.collection("children").add({
        parentId: category,
        name: name,
        age: age,
        grade: grade,
        school: school,
        mattendance: false,
        eattendance: false,
        driverid: driver
      })
      Alert.alert('Child added Successfully');
      setAge("")
      setGrade("")
      setName("")
      setSchool("")
    };
  }
  return (
    <>


      <View style={styles.inputContainer}>
        <SelectList
          
          setSelected={setCategory}
          data={ss.map(({ key, data }) => ({ value: key }))}
          placeholder={"Select Parent"}
          
        />
        <Text>{category}</Text>
        <TextInput
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop: 0,
            marginBottom: 10,
            marginTop: 20,
            backgroundColor: '#ffffff',
          }}
          mode="flat"
          placeholder='Full Name'
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => { setName(text) }}
        />
        <TextInput
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop: 0,
            marginBottom: 10,
            backgroundColor: '#ffffff',
          }}
          mode="flat"
          placeholder='Age'
          autoFocus
          type="text"
          keyboardType='number-pad'
          value={age}
          onChangeText={(text) => { setAge(text) }}
        />
        <TextInput
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop: 0,
            marginBottom: 10,
            backgroundColor: '#ffffff',
          }}
          mode="flat"
          placeholder='Grade'
          autoFocus
          type="text"
          value={grade}
          onChangeText={(text) => { setGrade(text) }}
        />
        <TextInput
          cursorColor="#00154E"
          activeUnderlineColor='#00154E'
          style={{
            width: 320,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop: 0,
            marginBottom: 40,
            backgroundColor: '#ffffff',
          }}
          mode="flat"
          placeholder='School Name'
          autoFocus
          type="text"
          value={school}
          onChangeText={(text) => { setSchool(text) }}
        />




        <Button
          theme={{ roundness: 2 }}
          textColor='#00154E'
          style={{
            width: 300,

            marginVertical: 10,
            marginTop: 0,
            borderColor: '#00154E',
            borderWidth: 2,
          }}
          mode="outlined"

          onPress={register}
        > Register </Button>
      </View>
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
    marginTop: 50,
    justifyContent: 'center',
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
