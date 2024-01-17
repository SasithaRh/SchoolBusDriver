import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { db } from "./firebase/firebase";
import LoginScreen from "./src/auth/LoginScreen";
import HomeScreen from "./src/HomeScreen";
import RegisterDriver from "./src/auth/RegisterDriver";
import RegisterParent from "./src/auth/RegisterParent";
import Childern from "./src/auth/Childern";
import Locations from "./src/screen/Locations";
import StudentAttendence from "./src/screen/StudentAttendence";
import DriverHome from "./src/screen/DriverHome";
import QrCodeScan from "./src/screen/QrCodeScan";
import Push from "./src/screen/Push";
import Notifications from "./src/screen/Notifications";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// Thanks for watching
const Tab =createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}

export default function App() {

 

  const addData = () => {
    db.collection("Chat")
      .doc("0AeZz2ca09RwbsknHbFW")
      .collection("messages")
      .add({
        first: "Adacxvcxvcxvcvb",
        last: "Lovelace",
        born: 1815,
      });
  };
  

  const Stack = createNativeStackNavigator();
  const globalScreenOption = {
    headerStyle: { backgroundColor: "#2c6bed" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
  return (
  <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOption}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login Driver" component={LoginScreen} />
        <Stack.Screen name="DriverHome" component={DriverHome} />
        <Stack.Screen name="StudentAttendence" component={StudentAttendence} />
        <Stack.Screen name="QrCodeScan" component={QrCodeScan} />
        <Stack.Screen name="Push Notification" component={Push} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Register Parent" component={RegisterParent} />
        <Stack.Screen name="Register Driver" component={RegisterDriver} />
        <Stack.Screen name="Childern" component={Childern} />
        <Stack.Screen name="Locations" component={Locations} />
        
      </Stack.Navigator>
    </NavigationContainer>
     {/* <NavigationContainer>
       <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen 
          name="Home" 
          component={DriverHome} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Entypo name="home" size={24} color={focused ? "#16247d": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>HOME</Text>
            </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="StudentAttendence" 
          component={StudentAttendence} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="attendence" size={24} color={focused ? "#16247d": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>Attendence</Text>
            </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="QrCodeScan" 
          component={QrCodeScan} 
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View
                 style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#16247d",
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30
                 }}
                >
                  <FontAwesome name="exchange" size={24} color="#fff" />
                </View>
              )
            }
           }}
          />
          <Tab.Screen
           name="Notifications" 
           component={Notifications}
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <MaterialIcons name="stacked-line-chart" size={24} color={focused ? "#16247d": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>PRICES</Text>
            </View>
              )
            }
          }}
           />
          <Tab.Screen 
          name="Push Notification" 
          component={Push} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Ionicons name="push notification" size={24}  color={focused ? "#16247d": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>Push Notification</Text>
            </View>
              )
            }
          }}
          />
       </Tab.Navigator>
     </NavigationContainer>  */}
    </>
  );
}
