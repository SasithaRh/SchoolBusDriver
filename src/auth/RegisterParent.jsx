import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import { Button, Portal, PaperProvider } from 'react-native-paper';
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
  const [nic, setNic] = useState("");
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
    if (name == "" || email == "" || contact == "" || nic == "" || address == "" || password == "") {
      Alert.alert("All the feilds are rquired")
    }
    else {
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
              nic: nic,
              location: {
                latitude: latitude,
                longitude: longitude,
              },
              role: "parent",
              userid: user.uid,
              driverid: driver
            });
          navigation.navigate("Login")
        })
        .catch((error) => alert(error.message));
    };
  }
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
      <PaperProvider style={{backgroundColor:"#ffffff"}}>
       
          <StatusBar style="light" />

         
       
      <Button
        theme={{ roundness: 2 }}
        textColor='#00154E'
        style={{
          width: 300,
          marginHorizontal: 60,
         
          marginTop: 30,
          borderColor: '#00154E',
          borderWidth: 2,
        }}
        mode="outlined"

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
                    style={{
                      width: 250,
                      marginHorizontal: 60,
                      marginVertical: 10,
                      marginTop: 10,
                      borderColor: '#00154E',
                      borderWidth: 2,
                      
                    }}
                  mode="outlined"
                  textColor="#00154E"
                  onPress={hideModal}
                >Set Location</Button>
                     <Button
                    style={{
                      width: 250,
                      marginHorizontal: 60,
                      marginVertical: 10,
                      marginTop: 10,
                      borderColor: 'red',
                      borderWidth: 2,
                      
                    }}
                  mode="outlined"
                  textColor="red"
                  onPress={reset}
                >Reset</Button>
                
              </Modal>
            </Portal>
            <View style={styles.inputContainer}>
            <TextInput
              cursorColor="#00154E"
              activeUnderlineColor='#00154E'
              style={{
                width: 320,
                marginHorizontal: 0,
                marginVertical: 0,
                marginTop: 0,
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
                marginTop: 10,
                backgroundColor: '#ffffff',
              }}
              mode="flat"
              placeholder='Email'
              value={email}
              type="email"
              onChangeText={(text) => { setEmail(text) }}
            />
            <TextInput
              cursorColor="#00154E"
              activeUnderlineColor='#00154E'
              style={{
                width: 320,
                marginHorizontal: 0,
                marginVertical: 0,
                marginTop: 10,
                backgroundColor: '#ffffff',
              }}
              mode="flat"
              placeholder='Contact No'
              value={contact}
              keyboardType='number-pad'

              onChangeText={(text) => { setContact(text) }}
            />
            <TextInput
              cursorColor="#00154E"
              activeUnderlineColor='#00154E'
              style={{
                width: 320,
                marginHorizontal: 0,
                marginVertical: 0,
                marginTop: 10,
                backgroundColor: '#ffffff',
              }}
              mode="flat"
              placeholder='NIC'
              value={nic}
              type="text"
              onChangeText={(text) => { setNic(text) }}
            />
            <TextInput
              cursorColor="#00154E"
              activeUnderlineColor='#00154E'
              style={{
                width: 320,
                marginHorizontal: 0,
                marginVertical: 0,
                marginTop: 10,
                backgroundColor: '#ffffff',
              }}
              mode="flat"
              placeholder='Address'
              value={address}
              type="text"
              onChangeText={(text) => { setAddress(text) }}
            />


            <TextInput
              cursorColor="#00154E"
              activeUnderlineColor='#00154E'
              style={{
                width: 320,
                marginHorizontal: 0,
                marginVertical: 0,
                marginTop: 10,
                backgroundColor: '#ffffff',
              }}
              mode="flat"
              placeholder='Password'
              value={password}
              type="password"
              secureTextEntry
              onChangeText={(text) => { setPassword(text) }}

            />

          </View>
          <View style={styles.buttonContainer}>
        <Button   
        theme={{roundness:2}}
        style={{
          width: 280,
         
          marginVertical:10,
          justifyContent: "center",
          backgroundColor:'#00154E',
          alignItems:'center'
        }}
         spacing={4}   mode='contained' onPress={register}
         >Register</Button>
          <Button   
        theme={{roundness:2}}
        style={{
          width: 280,
         
          marginVertical:0,
         
          backgroundColor:'#00154E',
        }}
         spacing={4}   mode='contained' onPress={() => navigation.navigate("Add Child")}
         >Add Child</Button>

  </View>
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
    height: 500,
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
    marginTop: 20,
    justifyContent: "center",
    marginLeft: 50,
  },
  buttonContainer:{
    width: 300,
    marginTop: 20,
    justifyContent: "center",
    marginLeft: 70,
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
