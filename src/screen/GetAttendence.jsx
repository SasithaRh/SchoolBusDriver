import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "../../firebase/firebase";

const GetAttendence = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not sacn yet");
  const [datas, setDatas] = useState([]);
  const [sets, setSets] = useState(true);
  const [time, setTime] = useState("");
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  var hour = new Date().getHours();
  useEffect(() => {
    setTime(hour);
    askForCameraPermission();
  }, []);

 const ehandleBarCodeScanned = ({ type, data }) => {

    setText(data);
    setScanned(true);

  };
  const mhandleBarCodeScanned = ({ type, data }) => {

    setText(data);
    setScanned(true);

  };

  useEffect(() => {
    if (scanned) {
      db.collection("children")
        .doc(text)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setDatas(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such a Record");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [scanned]);
  useEffect(() => {
    if (time >= 12) {
      datas.eattendance ? setSets(false) : setSets(true)
    } else {
      datas.mattendance ? setSets(false) : setSets(true)
    }
}, [datas]);


  const mupdate = () => {
    sets == true ? (db.collection("Notification").add({
      name: datas.name,
      parentId: datas.parentId,
      date: new Date().getTime(),
      test: sets,
      message: "Your child boarded the bus"
    })).then((doc) => {
      db.collection("children")
        .doc(text)
        .update({
          mattendance: sets
        })
    }) .catch((error) => {
      console.log("Error getting document:", error);
    }) : (db.collection("Notification").add({
      name: datas.name,
      parentId: datas.parentId,
      date: new Date().getTime(),
      test: sets,
      message: "Your child was dropped off from the bus"
    })).then((doc) => {
      db.collection("children")
        .doc(text)
        .update({
          mattendance: sets
        })
    }) .catch((error) => {
      console.log("Error getting document:", error);
    });
    setScanned(false);
  };


  const eupdate = () => {
    sets == true ? (db.collection("Notification").add({
      name: datas.name,
      parentId: datas.parentId,
      date: new Date().getTime(),
      test: sets,
      message: "Your child boarded the bus"
    })).then((doc) => {
      db.collection("children")
        .doc(text)
        .update({
          eattendance: sets
        })
    }).catch((error) => {
      console.log("Error getting document:", error);
    }) : (db.collection("Notification").add({
      name: datas.name,
      parentId: datas.parentId,
      date: new Date().getTime(),
      test: sets,
      message: "Your child was dropped off from the bus"
    })).then((doc) => {
      db.collection("children")
        .doc(text)
        .update({
          eattendance: sets
        })
    }).catch((error) => {
      console.log("Error getting document:", error);
    }) 
    setScanned(false);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar style="light" />
      {time >= 12 ? (
        <Text style={styles.text}>Scan the QRCde </Text>
      ) : (
        <Text style={styles.text}>Scan the QRCde </Text>
      )}
      {time >= 12 ? (<View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : ehandleBarCodeScanned}
          style={{ height: 600, width: 600 }}
        />
      </View>) : (<View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : mhandleBarCodeScanned}
          style={{ height: 600, width: 600 }}
        />
      </View>)}
      
      <Text style={styles.text3}>{datas.name}</Text>
      <Text style={styles.text3}>{text}</Text>
      
     
     {scanned && (
        <Button
          onPress={() => setScanned(false)}

          mode="contained"
        >Scan Again </Button>
      )}
      {time >= 12 ? (
        text == "No such a Record" ? (
          <Text></Text>
        ) : (
          scanned ? (
            <Button
              containerStyle={{
                width: 200,
                marginHorizontal: 100,
                marginVertical: 10,
              }}
              mode="contained"
              onPress={eupdate}
            >E Update</Button>
          ) : (""))
      ) : text == "No such a Record" ? (
        <Text></Text>
      ) : (
        scanned ? (
        <Button
          containerStyle={{
            width: 200,
            marginHorizontal: 100,
            marginVertical: 10,
          }}

          mode="contained"
          onPress={mupdate}
        >M Update</Button> ) : ("")
      )}


      
    </KeyboardAvoidingView>
  );
};

export default GetAttendence;
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
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: 400,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
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
  text3: {
    color: "#00154E",
    fontSize:15,
    marginLeft:15,
    fontWeight:'bold',
  
    
  },
  button: {
    width: 50,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "#00154E",
    fontSize:25,
    marginBottom:20,
    textAlign:"center",
    marginTop:20,
    fontWeight:'bold',
    
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
