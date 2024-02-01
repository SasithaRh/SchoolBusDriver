import { View, Text, StyleSheet, Alert, FlatList, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button ,Card} from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { SelectList } from "react-native-dropdown-select-list";


const SendMessage = ({ navigation }) => {

  const [category, setCategory] = useState([""]);
  const [message, setmessage] = useState([]);
  const [Emergency, seEmergency] = useState([]);
  const [emessage, setEmessage] = useState([]);
  const [delay, setDelay] = useState([]);
  const [dmessage, setDmessage] = useState([]);
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
      .where("category", "==", "general")
      .onSnapshot((snapShot) =>
        setmessage(
          snapShot.docs.map((doc) => ({

            data: doc.data(),
          }))
        )
      );
    db.collection("DriverMessages")
      .where("category", "==", "Emergency")
      .onSnapshot((snapShot) =>
        seEmergency(
          snapShot.docs.map((doc) => ({

            data: doc.data(),
          }))
        )
      );
    db.collection("DriverMessages")
      .where("category", "==", "delay")
      .onSnapshot((snapShot) =>
        setDmessage(
          snapShot.docs.map((doc) => ({

            data: doc.data(),
          }))
        )
      );
  }, []);
  const send = () => {
    if (category == "") {
      Alert.alert("All the feilds are rquired")
    }
    else {
      db.collection("Notification").add({
        notification: "all",
        date: new Date().getTime(),
        message: category,
        driverid: user
      })

      Alert.alert("Message Successfully Sent")

    }
  }
  const esend = () => {
    if (emessage == "") {
      Alert.alert("All the feilds are rquired")
    }
    else {
      db.collection("Notification").add({
        notification: "all",
        date: new Date().getTime(),
        message: emessage,
        driverid: user
      })

      Alert.alert("Message Successfully Sent")

    }
  }
  const dsend = () => {
    if (dmessage == "") {
      Alert.alert("All the feilds are rquired")
    }
    else {
      db.collection("Notification").add({
        notification: "all",
        date: new Date().getTime(),
        message: delay,
        driverid: user
      })

      Alert.alert("Message Successfully Sent")

    }
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
        <Card style={{marginBottom:20}}  backgroundColor="#FFFFFF"  >
          <Text style={styles.text} >General Announcement</Text>

          <SelectList
            setSelected={setCategory}
            data={message.map(({ data }) => data.message)}
            placeholder={"Select Message"}
          />
          <Button style={styles.button}

            containerStyle={{
              width: 50,
              marginHorizontal: 100,
              marginVertical: 10,
            }}
            spacing={4}
            mode="contained"
            onPress={send}
          >Send</Button>
          </Card>
          
          <Card style={{marginBottom:20}} backgroundColor="#FFFFFF"  >
          <Text style={styles.text} >Emergency Alert</Text>

          <SelectList
            setSelected={setEmessage}
            data={Emergency.map(({ data }) => data.message)}
            placeholder={"Select Message"}
          />
          <Button style={styles.button}

            containerStyle={{
              width: 50,
              marginHorizontal: 100,
              marginVertical: 10,
            }}
            spacing={4}
            mode="contained"
            onPress={esend}
          >Send</Button>
          </Card> 
            <Card  backgroundColor="#FFFFFF"  >
          <Text style={styles.text} >Delay Notification</Text>

          <SelectList
            setSelected={setDelay}
            data={dmessage.map(({ data }) => data.message)}
            placeholder={"Select Message"}
          />
          <Button style={styles.button}

            containerStyle={{
              width: 50,
              marginHorizontal: 100,
              marginVertical: 10,
            }}
            spacing={4}
            mode="contained"
            onPress={dsend}
          >Send</Button>
          </Card>
       
        </View>

      </KeyboardAvoidingView>



    </>
  );
};

export default SendMessage;
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
  // inputContainer: {
  //   width: 300,
  //   marginTop: 100,
  //   justifyContent: "center",
  //   marginLeft: 60,
  // },
  button: {
    width: 50,
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    width: 300,
    marginTop: 20,
    alignItems: "center",
    marginLeft:48,
    backgroundColor:'#FEC337',
    marginBottom:20
  },

  button2: {
    width: 300,
    marginTop: 10,
    alignItems: "center",
    marginLeft:48,
    backgroundColor:'#FEC337',
    marginBottom:20
  },
  selectlist: {
    width: 100,
    marginTop: 10,
    alignItems: "center",
    marginHorizontal:10,
    marginTop:10,

  },

  text: {
    color: "#00154E",
    fontSize:20,
    marginBottom:20,
    textAlign:"center",
    marginTop:20,
    fontWeight:'bold',
    
  },
});
