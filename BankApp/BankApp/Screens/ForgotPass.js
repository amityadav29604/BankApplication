import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const ForgotPass = ({navigation}) => {
    const [accNo, setAccNo] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [ uPassword, setUPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center'}}>
       <Image source={require('../assets/bankLogo.jpg')} style={{height:70,width:70,margin:10}}></Image>
        <Text style={styles.headtext}>Central Bank of India</Text>
      </View>
      <Text style={{color:"#9c8819",fontSize:25, margin:2,}}>Update Password</Text>
      <View style={{marginTop:30, marginBottom:40}}>
        <Text style={styles.text}>Enter Account Number :</Text>
        <TextInput placeholder='Enter Account Number' style={styles.TextInput} onChangeText={(e) =>setAccNo(e)}></TextInput>
        <Text style={styles.text}>Enter Your Email :</Text>
        <TextInput placeholder='Enter Your Email' style={styles.TextInput} onChangeText={(e) =>setUEmail(e)}></TextInput>
        <Text style={styles.text}>Enter Password :</Text>
        <TextInput secureTextEntry={true} placeholder='Enter Your Password' style={styles.TextInput} onChangeText={(e) =>setUPassword(e)}></TextInput>
        <Text style={styles.navtext} onPress={() => navigation.navigate("Login")}>Back to Login</Text>
        <TouchableOpacity style={styles.Btn} onPress={() =>updatePass(accNo, uPassword, uEmail)}>
          <Text style={{color:'white', fontSize:18, margin:2}}>Update</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const updatePass = (accNo, uPassword, uEmail) => {
    const regpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if(accNo == "" || uPassword == "" || uEmail == ""){
        alert("Please provide all fields !!");
    }else if(regpass.test(uPassword) === false){
      alert("Password must contain Min 1 uppercase letter, Min 1 lowercase letter, Min 1 special character, Min 1 number, Min 8 characters");
    }else{
        axios({
            method:'POST',
            url: 'http://192.168.0.102:8087/IDFC/Customer/updatePassword/' + accNo + '/' + uEmail + '/' + uPassword,
        }).then(function(response){
            console.log("response", JSON.stringify(response.data));
            alert( JSON.stringify(response.data));
        })
    }
}

export default ForgotPass

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c0c4c4',
      alignItems: 'center',
      paddingVertical:70,
    },
    headtext: {fontSize:30, marginVertical:10, marginBottom:70,color:'#9c3024'},
    text:{fontSize:20, marginHorizontal:10, marginVertical:5, color:'#5e1810'},
    navtext:{fontSize:18, marginHorizontal:20, marginVertical:15, color:'#0D4C92'},
    TextInput:{height:40, width:300,borderWidth:1, paddingLeft:20, borderRadius:10, margin:7, backgroundColor: 'white'},
    Btn: {height:50, borderWidth:2, borderRadius:15, alignItems:'center', justifyContent:'center' ,backgroundColor:'#0D4C92',marginTop:25}
  });