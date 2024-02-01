import { View, Text, StyleSheet, FlatList, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { List } from 'react-native-paper';
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";
import Item from "../components/Item";
import moment from "moment/moment";

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
    <View style={styles.container}>
      <StatusBar style="light" />


    
        <FlatList
         
          data={notify.sort((a, b) => {
            return b.data.date - a.data.date;
          })}
          renderItem={({ item, index }) =>
            <Item
              id={index}
              title={item.data.pname}
              description={item.data.message}
              date={moment(new Date(item.data.date)).format("YYYY-MM-DD HH:mm:ss a")}
              delete={item.key}
            />}
          keyExtractor={item => item.key}
        />

    </View>
  );
};

export default Notifications;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 8,
    
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
