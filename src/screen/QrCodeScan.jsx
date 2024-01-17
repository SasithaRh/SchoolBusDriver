import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "../../firebase/firebase";

const QrCodeScan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("No such a Record");
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
      date: new Date().toLocaleString(),
      test: sets,
      message: "Your child in the bus"
    })).then((doc) => {
      db.collection("children")
        .doc(text)
        .update({
          mattendance: sets
        })
    }) : (db.collection("Notification").add({
      name: datas.name,
      parentId: datas.parentId,
      date: new Date().toLocaleString(),
      test: sets,
      message: "Your child out the bus"
    })).then((doc) => {
      db.collection("children")
        .doc(text)
        .update({
          mattendance: sets
        })
    })
    setScanned(false);
  };


  const eupdate = () => {
    sets == true ? (db.collection("Notification").add({
      name: datas.name,
      parentId: datas.parentId,
      date: new Date().getTime(),
      test: sets,
      message: "Your child in the bus"
    })).then((doc) => {
      db.collection("children")
        .doc(text)
        .update({
          eattendance: sets
        })
    }) : (db.collection("Notification").add({
      name: datas.name,
      parentId: datas.parentId,
      date: new Date().getTime(),
      test: sets,
      message: "Your child out the bus"
    })).then((doc) => {
      db.collection("children")
        .doc(text)
        .update({
          eattendance: sets
        })
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
        <Text style={styles.text}>Student Evening Attendence </Text>
      ) : (
        <Text style={styles.text}>Student Morning Attendence </Text>
      )}
      {time >= 12 ? (<View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : ehandleBarCodeScanned}
          style={{ height: 450, width: 450 }}
        />
      </View>) : (<View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : mhandleBarCodeScanned}
          style={{ height: 450, width: 450 }}
        />
      </View>)}

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
        <Button
          containerStyle={{
            width: 200,
            marginHorizontal: 100,
            marginVertical: 10,
          }}

          mode="contained"
          onPress={mupdate}
        >M Update</Button>
      )}


      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained"
        onPress={() => navigation.navigate("DriverHome")}
      >Go Back</Button>
    </KeyboardAvoidingView>
  );
};

export default QrCodeScan;
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
  button: {
    width: 50,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "red",
    justifyContent: "center",
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "500"
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
