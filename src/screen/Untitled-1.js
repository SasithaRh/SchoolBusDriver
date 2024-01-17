  sets == true ?  (db.collection("Notification").add({
        name: datas.name,
        parentId:datas.parentId,
         date:new Date().toLocaleString(),
        test:sets,
        message:"Your child in the bus"
      })):( db.collection("Notification").add({
        name: datas.name,
        parentId:datas.parentId,
         date:new Date().toLocaleString(),
        test:sets,
        message:"Your child out the bus"
      }))


       const mhandleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);

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

    if (datas.mattendance == true) {
      setSets(false);
    } else {
      setSets(true);
    }
    console.log("Type: " + type + "\nData: " + data);
  };



// import { View, Text, StyleSheet, Alert, Image } from "react-native";
// import React, { useState, useEffect } from "react";
// import { Button } from 'react-native-paper';
// import { StatusBar } from "expo-status-bar";
// import { KeyboardAvoidingView } from "react-native";
// import { auth, db } from "../../firebase/firebase";
// import * as Location from "expo-location";
// import { BottomNavigation } from 'react-native-paper';
// import StudentAttendence from "./StudentAttendence";
// import QrCodeScan from "./QrCodeScan";
// import Push from "./Push";
// import Notifications from "./Notifications";
// import { Icon, MD3Colors } from 'react-native-paper';

// const DriverHome = ({ navigation }) => {
//  const [origin, setOrigin] = useState({ latitude: 6.038716, longitude: 79.86033273959117 });
//  const [isButtonDisabled, setButtonDisabled] = useState(false);
//  const [user, setUser] = useState("");

//  useEffect(() => {
//    const unsubscribe = auth.onAuthStateChanged((authUser) => {
//      if (authUser) {
//        setUser(authUser.uid);
//      } else {
//        setUser(null);
//      }
//    });
//    return () => {
//      unsubscribe();
//    };
//  }, [user]);

//  const handleButtonClick = () => {
//    if (!isButtonDisabled) {
//      db.collection("Notification").add({
//        notification:"all",
//        date:new Date().toLocaleString(),
//        message:"Bus has Started",
//        driverid:user
//      })
//      Alert.alert('Bus Started');
//      setButtonDisabled(true);
//      setTimeout(() => {
//        setButtonDisabled(false);
//      }, 60 * 1000); // 2 hours in milliseconds
//    }
//  };

//  const userlocation = async()=>{
//    let { status } = await Location.requestForegroundPermissionsAsync();
//    if (status !== "granted") {
//      setErrorMsg("Permission to access location was denied");
//    }

//    let location = await Location.getCurrentPositionAsync({
//      enableHighAccuracy: true,
//    });
   
//    setOrigin({
//      latitude: location.coords.latitude,
//      longitude: location.coords.longitude,
//    })
//  }

//  const lupdate = async () => {
//    try {
//      await db.collection("Driver").doc(user).update({
//        location: {
//          latitude: origin.latitude,
//          longitude: origin.longitude,
//        },
//      });
//    } catch (error) {
//      console.error("Error updating location:", error);
//    }
//  };
//  const notification = <Icon  source="camera"
//  color={MD3Colors.error50}
//  size={20} />;
//  const [index, setIndex] = React.useState(0);
//  const [routes] = React.useState([
//    { key: 'studentAttendance', title: 'Student Attendance', focusedIcon: 'clipboard-account' },
//    { key: 'qrCodeScan', title: 'QR Code Scan', focusedIcon: 'qrcode-scan' },
//    { key: 'pushNotification', title: 'Push Notification', focusedIcon: 'send' },
//    { key: 'notifications', title: 'Notifications View', focusedIcon: 'bell' },
//  ]);

//  const renderScene = BottomNavigation.SceneMap({
//    studentAttendance: StudentAttendence,
//    qrCodeScan: QrCodeScan,
//    pushNotification: Push,
//    notifications: Notifications,
//  });

//  return (
//    <>
//      <KeyboardAvoidingView behavior="height" styles={styles.container}>
//        <StatusBar style="light" />
//        <Image
//          source={require("../image/logo.jpg")}
//          style={styles.image}
//        />
//        <View style={styles.inputContainer}></View>
//        <Button
//          onPress={handleButtonClick}
//          disabled={isButtonDisabled}
//          containerStyle={{
//            width: 200,
//            marginHorizontal: 100,
//            marginVertical: 10,
//          }}
//          mode="contained" 
//        >{isButtonDisabled ? 'Bus Started' : 'Bus Start'} </Button>
//        <Text> {origin.longitude}</Text>
//        <Button
//         containerStyle={{
//           width: 200,
//           marginHorizontal: 100,
//           marginVertical: 10,
//         }}
//         spacing={4}

//         onPress={() => navigation.navigate("Register Parent")}
//       >Notifications</Button>
//      </KeyboardAvoidingView> 
//       {/* <BottomNavigation
//        navigationState={{ index, routes }}
//        onIndexChange={setIndex}
//        renderScene={renderScene}
//      />  */}
//    </>
//  );
// };

// export default DriverHome;

// const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    justifyContent: "center",
//    backgroundColor: "#ecf0f1",
//    padding: 8,
//    alignItems: "center",
//  },
//  inputContainer: {
//    width: 300,
//    justifyContent: "center",
//    marginLeft: 60,
//  },
//  image: {
//    width: 190,
//    height: 190,
//    justifyContent: "center",
//    alignItems: "center",
//    marginHorizontal: 120,
//    marginVertical: 70,
//    borderRadius:80
//  },
// });