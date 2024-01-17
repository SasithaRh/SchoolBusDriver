import { View, Text, StyleSheet,Alert, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const DriverHome = ({ navigation }) => {

  const [origin, setOrigin] = useState({ latitude: 6.038716,  longitude: 79.86033273959117 });
 
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [datas, setDatas] = useState();
  const [user, setUser] = useState("345vpVfReIhoUE8B544ROk5AvXh1");



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


  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      // Perform your button click logic here
      db.collection("Notification").add({
       
        notification:"all",
        date:new Date().toLocaleString(),
        message:"Bus has Started",
        driverid:user
      })
      Alert.alert('Bus Started');

      // Disable the button
      setButtonDisabled(true);
   
      // Set a timeout to enable the button after 2 hours
      setTimeout(() => {
        setButtonDisabled(false);
      }, 60 *  1000); // 2 hours in milliseconds
    }
  };

  const userlocation = async()=>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    
    setOrigin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
      console.log(origin.longitude)
  };

  const updateLocationInFirebase = async () => {
    try {
      await db.collection("Driver").doc(user).update({
        location: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
      });
      console.log("Location updated in Firebase:", origin.latitude, origin.longitude);
    } catch (error) {
      console.error("Error updating location in Firebase:", error);
      setErrorMsg("Error updating location in Firebase");
    }
  };
  
  useEffect(() => {
    const interval = setInterval(async () => {
      await userlocation();
      await updateLocationInFirebase();
    }, 3000);
  
    // Cleanup interval on component unmount or when 'origin' changes
    return () => clearInterval(interval);
  }, [origin]);
  
  return (
    <>
    <KeyboardAvoidingView behavior="height" styles={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../image/logo.jpg")}
        style={styles.image}
      />
      <View style={styles.inputContainer}></View>
      <Button
      
        onPress={handleButtonClick}
        disabled={isButtonDisabled}
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
      >{isButtonDisabled ? 'Bus Started' : 'Bus Start'} </Button>
      <Text> {origin.longitude}</Text>
      <Text> {origin.latitude}</Text>
      <Button
        
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
        spacing={4}
        onPress={() => navigation.navigate("StudentAttendence")}
      >Student Attendance</Button>

      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
       
       onPress={() => navigation.navigate("QrCodeScan")}
      >QR Scan</Button>
       <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
        onPress={() => navigation.navigate("Push Notification")}
      >Push Notification</Button>
         <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
       
        onPress={() => navigation.navigate("Notifications")}
      >Notifications</Button>
      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
        theme={{ colors: { primary: 'green' }}}
        onPress={() => navigation.navigate("Register Parent")}
      >Parent Register</Button>
      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
        theme={{ colors: { primary: 'green' }}}
        onPress={() => navigation.navigate("Locations")}
      >Locations</Button>
    </KeyboardAvoidingView>

   </>
  );
};

export default DriverHome;
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
    borderRadius:80
  },
});


