

import { View, Text, StyleSheet,Alert, FlatList, Image ,ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button , Card, IconButton} from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

 const HomeScreen = ({ navigation }) => {

const [origin, setOrigin] = useState({ latitude: 6.038716, longitude: 79.86033273959117 });

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

      notification: "all",
      date: new Date().getTime(),
      message: "The bus is on its way. Thank you!",
      driverid: user
    })
    Alert.alert('Message has sent to the parents');

    // Disable the button
    setButtonDisabled(true);


  }
};





const fetchLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
  }
  let location = await Location.getCurrentPositionAsync({});
  console.log(location.coords)
  setOrigin({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
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
    await fetchLocation();
    await updateLocationInFirebase();
  }, 4000);

  // Cleanup interval on component unmount or when 'origin' changes
  return () => clearInterval(interval);
}, [origin]);
  return (


    
    <>
    
    <View style={[styles.container]}>
   
    <Card style={styles.card1} backgroundColor="#FFFFFF" width="100%" height="20%">
    
    
    
    
    <Card.Actions>
   
   <Button style={styles.button1}
       onPress={handleButtonClick}
       disabled={isButtonDisabled}
 
       
      
       
       containerStyle={{  
       }}
       mode="contained" 
       theme={{ colors: { primary: 'green' }}}
     >{isButtonDisabled ? 'Bus Started' : 'START JURNEY'} </Button>

   </Card.Actions>

    <Image
        source={require("../image/BusB.png")}
        style={styles.image1}
      />   
     <Card.Content >
  
    </Card.Content>
    

     </Card>

        <View style={styles.column1} >
             <View style={styles.item1}>
             
             
             
              <Card style={styles.card2} backgroundColor=""   >
              <Text style={styles.text3}>Get Attendence</Text>
    <Image 
        source={require("../image/QR_scanner-remove.png")}
        style={styles.image2}
      />
     <Card.Content >
    </Card.Content>
    
    <Card.Actions>
    <Button
        marginHorizontal={60}
       
        style={styles.button}
        mode="contained" 
        spacing={4}
        onPress={() => navigation.navigate("Get Attendence")}
      >Go</Button>
    </Card.Actions>
     </Card>
     </View>
             <View style={styles.item1}>
             <Card style={styles.cardL} backgroundColor=""   >
             <Text style={styles.text3}>Send Message</Text>
    <Image 
        source={require("../image/PN.png")}
        style={styles.image3}
      />
     <Card.Content >
    </Card.Content>
    
    <Card.Actions>
    <Button
        marginHorizontal={60}
        containerStyle={{
          width: 200,
          marginHorizontal: 500,
          marginVertical: 10,
        }}
        mode="contained" 
        spacing={4}
        style={styles.button}
        onPress={() => navigation.navigate("Send Message")}
      >Go</Button>
    </Card.Actions>
     </Card>
     <Card style={styles.card4} backgroundColor=""   >
        <Text style={styles.text3}>Parents Location</Text>
    <Image 
        source={require("../image/LocationBW.png")}
        style={styles.image3}
      />
     <Card.Content >
    </Card.Content>
    
    <Card.Actions>
    <Button 
        marginHorizontal={60}
        containerStyle={{
          width: 200,
          marginHorizontal: 500,
          marginVertical: 10,
        }}
        mode="contained" 
        spacing={4}
        style={styles.button}
        onPress={() => navigation.navigate("Parents Location")}
      >Go</Button>
    </Card.Actions>
     </Card>
             </View>
            
        </View>
        <View style={styles.column2}>
             <View style={styles.item1}>

             <Card style={styles.card2} backgroundColor=""   >
             <Text style={styles.text3}>Attendence Sheet</Text>
    <Image 
        source={require("../image/attendence-remove.png")}
        style={styles.image4}
      />
     <Card.Content >
    </Card.Content>
    
    <Card.Actions>
    <Button
    marginHorizontal={80}
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
        style={styles.button}
        onPress={() => navigation.navigate("Attendence Sheet")}
      >Go</Button>
    </Card.Actions>
     </Card>

             </View>
             <View style={styles.item1}>

             <Card style={styles.cardL} backgroundColor=""   >
             <Text style={styles.text3}>Notifications</Text>
    <Image 
        source={require("../image/NFR.png")}
        style={styles.image5}
      />
     <Card.Content >
    </Card.Content>
    
    <Card.Actions>
    <Button
    marginHorizontal={90}
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained" 
        style={styles.button}
        onPress={() => navigation.navigate("Notifications")}
      >Go</Button>
    </Card.Actions>
     </Card>
     <Card style={styles.card4} backgroundColor=""   >
        <Text style={styles.text3}>Parent Register</Text>
    <Image 
        source={require("../image/register-remove.png")}
        style={styles.image6}
      />
     <Card.Content >
    </Card.Content>
    
    <Card.Actions>
    <Button 
        marginHorizontal={60}
        containerStyle={{
          width: 200,
          marginHorizontal: 500,
          marginVertical: 10,
        }}
        mode="contained" 
        spacing={4}
        style={styles.button}
        onPress={() => navigation.navigate("Register Parent")}
      >Go</Button>
    </Card.Actions>
     </Card>
             </View>
           
        </View>
        
      </View>



      </>
  );
};

    
  

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:'50',
    marginVertical:'50',
    width:"100%",
    height:100,
    backgroundColor: "#ffffff",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' 
    

  },

  list: {
    width: "100",
    backgroundColor: "#000",
  },
  card:{
backgroundColor:"#FFFFFF",
paddingTop:60,

  },
  text3: {
    color: "#00154E",
    fontSize:15,
    marginLeft:15,
    fontWeight:'bold',
  
    
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
  top: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  item :{
    flex: 1, 
    height: 100,
    padding: 20,
    backgroundColor: 'red',
    width: 200,
  },
  item1 :{

    height:200,
    padding: 15,
    marginHorizontal:33,
    marginVertical:10,
    width: 100,
    
  },
  card1:{

    backgroundColor:'#FEC337',
    width:"100%",
    height:150,
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
  },
  card2:{
    backgroundColor:'#FFFFFF',
    width:160,
    height:160,
    marginTop:30,


  },
cardL:{
  backgroundColor:'#FFFFFF',
    width:160,
    height:160,

    marginTop:-20,
   
},
  card3:{
    backgroundColor:'#FFFFFF',
    width:160,
    height:160,
    marginLeft:120,
    marginTop:-40,

  },

  card4:{
    backgroundColor:'#FFFFFF',
    width:160,
    height:160,
    // marginBottom:10,
    marginTop:20,
   

  },

  card5:{


  },
  image1: {
    width: 120,
    height: 120,
    // justifyContent: "center",
    // alignItems: "center",
    // marginHorizontal: 200,
    marginVertical:0,
    marginTop:0,
    marginRight:10,
    marginLeft:250,
    
  },

  image2: {
    width: 80,
    height: 80,
    
    // marginHorizontal: 200,
    marginVertical:0,
    marginTop:0,
    marginLeft:40,
    // marginLeft:250,
    
  },
  button: {
    width: 100,
    marginTop: 0,
    alignItems: "center",
    marginRight:16,
    backgroundColor:"#00154e"
  },
  image3: {
    width: 80,
    height: 80,
    
    // marginHorizontal: 200,
    marginVertical:0,
    marginTop:0,
    marginLeft:40,
    // marginLeft:250,
    
  },
  image4: {
    width: 80,
    height: 80,
    
    // marginHorizontal: 200,
    marginVertical:0,
    marginTop:0,
    marginLeft:40,
    // marginLeft:250,
    
  },
  image5: {
    width: 80,
    height: 80,
    
    // marginHorizontal: 200,
    marginVertical:0,
    marginTop:0,
    marginLeft:40,
    // marginLeft:250,
    
  },
  image6: {
    width: 80,
    height: 80,
    
    // marginHorizontal: 200,
    marginVertical:0,
    marginTop:0,
    marginLeft:40,
    // marginLeft:250,
    
  },

  button1:{
 
   
    backgroundColor: 'green',
    Width: 80,
    height:50,
    
    marginRight:120,
    marginLeft:30,
    borderRadius:10,
    padding:5,
    marginTop:30
  },
  column1:{
   
  }, 
  column2:{
      marginLight:10,
    // height:100,
    // width:50,
  },
  


});
