import { View, Text, StyleSheet, Alert , FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";
import { Checkbox } from 'react-native-paper';

const StudentAttendence = ({ navigation }) => {
  const [Attendence, setAttendence] = useState([]);
  const [time, setTime] = useState("");
  const [user, setUser] = useState("");
  const [driver, setDriver] = useState("");

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setDriver(authUser.uid);
     } else {
      setDriver(null);
    }
  });
 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.uid);
       
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
 useEffect(() => {
    db.collection("children")
    .where('driverid', '==', user)
      .onSnapshot((snapShot) =>
        setAttendence(
          snapShot.docs.map((doc) => ({
            key: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);



  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar style="light" />
      {time >= 12 ? (
        <Text style={styles.text}>Student Evening Attendence </Text>
      ) : (
        <Text style={styles.text}>Student Morning Attendence </Text>
      )}
      {time >= 12
        ? Attendence.map(({ key, data }) => (
            <Text key={key} style={styles.title}>
              {data.name} <Checkbox checked={data.eattendance} />
            </Text>
          ))
        : Attendence.map(({ key, data }) => (
            <Text key={key} style={styles.title}>
              {data.name} <Checkbox checked={data.mattendance} />
            </Text>
          ))}
          <Text>{driver}</Text>
    
      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained"
       
        onPress={() => navigation.goBack()}
      >Back</Button>
    </KeyboardAvoidingView>
  );
};

export default StudentAttendence;
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
  title: {
    color: "red",
    fontSize: 20,

    fontWeight: "500",
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
    alignItems: "center",
    fontSize: 20,
  },
  item: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 120,
    marginVertical: 70,
  },
});
