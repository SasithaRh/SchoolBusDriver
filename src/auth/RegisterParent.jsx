import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { Button,Portal,PaperProvider  } from 'react-native-paper';
import { Modal } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";

import { KeyboardAvoidingView } from "react-native";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const RegisterParent = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [driver, setDriver] = useState("");
  
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setDriver(authUser.uid);
     } else {
      setDriver(null);
    }
  });
  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        const user = authUser.user;
        db.collection("Parent")
          .doc(user.uid)
          .set({
            name: name,
            email: email,
            contact: contact,
            address: address,
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            role: "parent",
            userid: user.uid,
            driverid:driver
          });
          navigation.navigate("Login Driver")
          })
      .catch((error) => alert(error.message));
  };

  const GOOGLE_MAPS_APIKEY = "AIzaSyAyl606YHrgO812m7O70O_ZNSYU38XQ6uo";

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;

    // Check if latitude and longitude are already set
    if (latitude === null || longitude === null) {
      setLatitude(coordinate.latitude);
      setLongitude(coordinate.longitude);
    }
  };
  const [mapRegion, setmapRegion] = useState({
    latitude: 6.8781640649038716,
    longitude: 79.86033273959117,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [visible, setVisible] = useState(false);

  const hideModal = () => {
    setVisible(!visible);
  };
  const reset = () => {
    setLatitude(null);
    setLongitude(null);
  };
  return (
    <>
     <PaperProvider>
      <KeyboardAvoidingView
        behavior="padding"
        styles={styles.container}
        keyboardVerticalOffset={280}
      >
        <StatusBar style="light" />

        <View style={styles.inputContainer}>
          <Button
            containerStyle={{
              width: 200,
            }}
            mode="contained" 
            onPress={hideModal}
          >Set Location</Button>
         
          <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 6.8781640649038716,
                longitude: 79.86033273959117,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={handleMapPress}
            >
              {latitude !== null && longitude !== null && (
                <Marker
                  coordinate={{ latitude, longitude }}
                  title="Selected Location"
                />
              )}
            </MapView>
            
            <Button
               mode="contained" 
              onPress={hideModal}
            ></Button>
               <Button
              
             
               mode="contained" 
              onPress={reset}
            >Reset
            </Button>
          </Modal>
          </Portal>
         
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
            placeholder="Email"
            value={email}
            type="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="Address"
            value={address}
            type="text"
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
          <TextInput
            placeholder="Contact No"
            value={contact}
            type="text"
            onChangeText={(text) => {
              setContact(text);
            }}
          /> 

    
        <TextInput 
           placeholder='Password'
           value={password}
           type="password"
           secureTextEntry
           onChangeText={(text)=>{setPassword(text)}}
         
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
       
        mode="contained" 
      >Register</Button>
      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
       
        mode="contained" 
        onPress={() => navigation.navigate("Childern")}
      >Add Child</Button>
       </PaperProvider>
    </>
  );
};

export default RegisterParent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
    alignItems: "center",
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  map: {
    width: 400,
    height: 400,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
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
  locations: {
    width: 200,
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
