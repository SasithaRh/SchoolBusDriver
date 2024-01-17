import { View, Text, StyleSheet, FlatList, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { List } from 'react-native-paper';
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";
import { ScrollView } from "react-native";
import Item from "./Item";

const Notifications = ({ navigation }) => {
  const [origin, setOrigin] = useState([]);
  const [notify, setNotify] = useState([]);
  const [user, setUser] = useState("");

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser.uid);

    } else {
      setUser(null);
    }
  });
  useEffect(() => {

    db.collection("DriverNotification")
      .where('driverid', '==', user)
      .orderBy('date', 'desc')
      .get()
      .then((querySnapshot) => {
        const notification = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          data: doc.data(),
        }));

        setNotify(notification);
      });

  }, [user, notify]);


  return (
    <KeyboardAvoidingView behavior="height" styles={styles.container}>
      <StatusBar style="light" />


      <ScrollView>
        <FlatList
          data={notify}
          renderItem={({ item, index }) =>
            <Item
              id={index}
              title={item.data.pname}
              description={item.data.message}
              date={item.data.date}
              delete={item.key}
            />}
          keyExtractor={item => item.key}
        />
</ScrollView>
      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        spacing={4}

        onPress={() => navigation.navigate("Notifications")}
      >Notifications</Button>

    </KeyboardAvoidingView>
  );
};

export default Notifications;
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
    borderRadius: 80
  },
});
