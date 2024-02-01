import { View, Text, StyleSheet, Alert, FlatList, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth, addDoc, collection, db } from "../../firebase/firebase";
import { Checkbox } from 'react-native-paper';
import { query, where } from "firebase/firestore";  
const StudentAttendence = ({ navigation }) => {
  const [Attendence, setAttendence] = useState([]);
  const [time, setTime] = useState("");
  const [user, setUser] = useState("");
  const [driver, setDriver] = useState("");
  const [presentStudent, setPresentStudent] = useState([]);
  
  var hour = new Date().getHours();
  useEffect(() => {
    setTime(hour);

  }, []);
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
  useEffect(() => {
    db.collection("children")
      .where('driverid', '==', user)

      .onSnapshot((snapShot) =>
        setAttendence(
          snapShot.docs.map((doc) => ({
            key: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [user]);
  // useEffect(() => {
  // db.collection("children")
  // .where('mattendance', '==', true)

  // .onSnapshot((snapShot) =>
  //   setPresentStudent(
  //     snapShot.docs.map((doc) => ({
  //       key: doc.id,
  //       data: doc.data(),
  //     }))
  //   )
  // );
//  var q1= db.collection("children").where("mattendance", "==", true).where('driverid', '==', user);
//   q1.get().then((querySnapshot) => {
//     const notification = querySnapshot.docs.map((doc) => ({
//       key: doc.id,
//       data: doc.data(),
//     }));

//     setPresentStudent(notification);
//   });

// }, [Attendence]);
// const update = () =>{
//   db.collection("present")
//           .doc()
//           .set({
//             name: presentStudent,
            
//           });
  
// }

  return (
   <>
   
   <View
        style={{
          paddingTop: 30,
          marginBottom:30,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
      {time >= 12 ? (
        <Text style={styles.text1}>Student Evening Attendence </Text>
      ) : (
        <Text style={styles.text1}>Student Morning Attendence </Text>
      )}
       </View>
       <View style={styles.column2} >
        
      {time >= 12
        ? Attendence.map(({ key, data }) => (
          <>
             <View
        style={{
          marginBottom:10,
          flexDirection: 'row',
          
        }}>
               <View
        style={{
          marginBottom:10,
          flexDirection: 'row',
          width:220
        }}><Text key={key} style={styles.title}>
        {data.name} 
      </Text></View>
      <View
        style={{
          marginBottom:10,
          flexDirection: 'row',
          
        }}>
          <Checkbox  status={data.eattendance ? 'checked' : 'unchecked'} />
          {data.eattendance ? <Text>In</Text> : <Text>Out</Text>}
          
          </View>
          </View>
          </>
        ))
        : Attendence.map(({ key, data }) => (
          <>
          <View
     style={{
       marginBottom:10,
       flexDirection: 'row',
       
     }}>
            <View
     style={{
       marginBottom:10,
       flexDirection: 'row',
       width:220
     }}><Text key={key} style={styles.title}>
     {data.name} 
   </Text></View>
   <View
     style={{
       marginBottom:10,
       flexDirection: 'row',
       
     }}>
       <Checkbox  status={data.mattendance ? 'checked' : 'unchecked'} />
       {data.mattendance ? <Text>In</Text> : <Text>Out</Text>}
       </View>
       
       </View>
       </>
        ))}
        
    
    
        </View>
{/* <Text>{presentStudent.length}</Text>
{presentStudent.map(({ key, data }) => (
          <Text key={key} style={styles.title}>
           {key}
          </Text>))} */}
      {/* <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained"

        onPress={update}  >Update</Button>
      <Button
        containerStyle={{
          width: 200,
          marginHorizontal: 100,
          marginVertical: 10,
        }}
        mode="contained"

        onPress={() => navigation.goBack()}
      >Back</Button> */}

       
   </>
  );
};

export default StudentAttendence;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
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
  title: {
    tintColor: "#00154",
    fontSize: 20,
    marginRight:50,
    fontWeight: "400",
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

  text1: {
    color: "#00154E",
    fontSize:20,
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

  column2:{
    marginTop:-0,
    marginBottom:0,
    marginLeft:50,

 
   }, 
});
