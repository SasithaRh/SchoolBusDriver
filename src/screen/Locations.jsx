import { View, Text, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FAB, Title } from 'react-native-paper'
import { SafeAreaView } from 'react-native'

const Locations = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [origin, setOrigin] = useState({ latitude: 6.8781640649038716, longitude: 79.86033273959117 });
  const [destination, setDestination] = useState([]);
  const GOOGLE_MAPS_APIKEY = "AIzaSyAyl606YHrgO812m7O70O_ZNSYU38XQ6uo";
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser.uid);

    } else {
      setUser(null);
    }
  });
  const [mapRegion, setmapRegion] = useState({
    latitude: 6.773,
    longitude: 79.8816,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    db.collection("Parent")
      .where('driverid', '==', user)
      .onSnapshot((snapShot) =>
        setDestination(
          snapShot.docs.map((doc) => ({
            key: doc.id,
            data: doc.data().location,
            name:doc.data().name,
          }))
        )
      );
  }, [user]);
  
  const userlocation = async () => {
    db.collection("Driver")
      .doc(user)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setOrigin(doc.data().location);
          console.log("Document data:", doc.data().location);
        }
      });

  };

  useEffect(() => {
    const interval = setInterval(() => {
      userlocation();
    }, 4000);
    return () => clearInterval(interval)
  }, [user])

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} initialRegion={mapRegion} >
        {destination.map(({ key, data,name }) => (
          <Marker key={key} coordinate={data}  title={name} />
        ))}
        <Marker coordinate={origin} >
          <View>
            <Image
              source={require("../image/map_icon.png")}
              style={styles.markerImage}
            />
          </View></Marker>

      </MapView>


    </SafeAreaView>
  );
};

export default Locations;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    alignItems: "center",
  },
  markerImage: {
    width: 35,
    height: 35
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
  map: {
    width: 500,
    height: 700,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    margin: 16
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
