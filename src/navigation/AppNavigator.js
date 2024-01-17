import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";
import { Icon, MD3Colors } from 'react-native-paper';
//Utility Screens
import LoginScreen from "../auth/LoginScreen";
import HomeScreen from "../HomeScreen";
import RegisterDriver from "../auth/RegisterDriver";
import RegisterParent from "../auth/RegisterParent";
import Childern from "../auth/Childern";

import Loading from "../screen/utils/Loading";
import Locations from "../screen/Locations";
import StudentAttendence from "../screen/StudentAttendence";
import DriverHome from "../screen/DriverHome";
import QrCodeScan from "../screen/QrCodeScan";
import Push from "../screen/Push";
import Notifications from "../screen/Notifications";
//General Screens



const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    > <AuthStack.Screen name="Login Driver" component={LoginScreen} />
      <AuthStack.Screen name="Register Parent" component={RegisterParent} />
      <AuthStack.Screen name="Register Driver" component={RegisterDriver} />
      <AuthStack.Screen name="Childern" component={Childern} />

    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="DriverHome" component={DriverHome} />
      <MainStack.Screen name="StudentAttendence" component={StudentAttendence} />
      <MainStack.Screen name="QrCodeScan" component={QrCodeScan} />
      <MainStack.Screen name="Push Notification" component={Push} />
      <MainStack.Screen name="Notifications" component={Notifications} />
      <MainStack.Screen name="Locations" component={Locations} />
      <MainStack.Screen name="MainTabs" component={MainTabs} />

    </MainStack.Navigator>
  );
};

// const BottomTabBar = ({ navigation, state }) => {
//   const HomeIcon = (props) => <Icon {...props} name="clipboard" />;
//   const PremiumIcon = (props) => <Icon {...props} name="star" />;
//   const ProfileIcon = (props) => <Icon {...props} name="person" />;
//   return (
//     <BottomNavigation
//       selectedIndex={state.index}
//       onSelect={(index) => navigation.navigate(state.routeNames[index])}
//     >
//       {/* <BottomNavigationTab icon={HomeIcon} title="Workout" />
//       <BottomNavigationTab icon={PremiumIcon} title="Premium" />
//       <BottomNavigationTab icon={ProfileIcon} title="Profile" /> */}
//       <BottomNavigationTab title="StudentAttendence" component={StudentAttendence} />
//       <BottomNavigationTab title="QrCodeScan" component={QrCodeScan} />
//       <BottomNavigationTab title="Push Notification" component={Push} />
//       <BottomNavigationTab title="Notifications" component={Notifications} />
//       <BottomNavigationTab title="DriverHome" component={DriverHome} />
//     </BottomNavigation>
//   );
// };

const Tabs = createBottomTabNavigator();
const MainTabs = () => (
  <Tabs.Navigator
    screenOptions={{
      headerShown: false,
    }}
    
  >
    <Tabs.Screen name="StudentAttendence" component={StudentAttendence} />
    <Tabs.Screen name="QrCodeScan" component={QrCodeScan} />
    <Tabs.Screen name="Push Notification" component={Push} />
    <Tabs.Screen name="Notifications" component={Notifications} />

    {/* <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Premium" component={Premium} />
    <Tabs.Screen name="Profile" component={Profile} /> */}
  </Tabs.Navigator>
);

export default () => {
  const context = useContext(AuthContext);
  const user = context.user;

  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
