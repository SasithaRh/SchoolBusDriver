import React ,{ useState, useEffect, useRef, } from 'react';
import { AntDesign,MaterialIcons } from '@expo/vector-icons';
import { View, Text,StyleSheet,Pressable,Alert } from 'react-native'
import { Checkbox } from 'react-native-paper';
import { auth, addDoc, collection, db } from "../../firebase/firebase";




const Item = (props) => {
    const handleDelete = () => {
      Alert.alert(
        "Do you want to delete this meesage!",
        
        [
          
          {
            text:"No",
            onPress:()=>{
              console.log(props.delete);
            }
          },
          {
            text:"Yes",
            onPress:()=>{
              db.collection("DriverNotification").doc(props.delete).delete().then(() => {
              
              }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            }
          }
        ]
      )
      };
  return (
    <View style={styles.container}>
   
        <Pressable style={styles.delete} >
        <AntDesign name="checkcircleo" size={24} color="black" />
        </Pressable>
      <Text style={styles.title}>{props.title}{props.description}{props.date}</Text>
      
      
      <Pressable style={styles.delete} onPress={handleDelete} >
          <MaterialIcons name="delete" size={24} color="#FF6768"  />
        </Pressable>
    
    </View>
  )
}

export default Item;

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: "#32DBC6",
        width: "90%",
        borderRadius: 10,
        padding: 13,
        alignItems: "center",
        marginTop: 15
    },
    title:{
        color: "#fff",
        fontSize: 20,
        flex: 1,
        fontWeight: "500",
        marginLeft:10
    },
    delete:{
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      
    }
})
