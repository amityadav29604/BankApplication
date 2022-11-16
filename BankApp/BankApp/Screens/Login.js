import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const Login = ({navigation}) => {
    const [accNo, setAccNo] = useState("");
    const [ uPassword, setUPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Image source={require('../assets/bankLogo.jpg')} style={{height:70,width:70,borderRadius:2}}></Image>
        <Text style={styles.headtext}>Central Bank of India</Text>
      </View>
      <Text  style={{color:"#9c8819",fontSize:25, margin:2,}}> Welcome </Text>
      <View style={{marginTop:30, marginBottom:40}}>
        <Text style={styles.text}>Enter Account Number:</Text>
        <TextInput placeholder='Enter Account Number Having 4 Digit' style={styles.TextInput} onChangeText={(e) =>setAccNo(e)}></TextInput>
        <Text style={styles.text}>Enter Password:</Text>
        <TextInput secureTextEntry={true} placeholder='Enter Your Password' style={styles.TextInput} onChangeText={(e) =>setUPassword(e)}></TextInput>
        <Text style={styles.navtext} onPress={() => navigation.navigate("ForgotPass")}>Forgot Password?</Text>
        <Text style={styles.navtext} onPress={() => navigation.navigate("SignUp")}>SignUp</Text>
        <TouchableOpacity style={styles.Btn} onPress={() =>LogIn(accNo, uPassword, navigation)}>
          <Text style={{color:'white', fontSize:18, margin:2}}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const LogIn = (accNo, uPassword, navigation) =>{
  if(accNo == '' || uPassword == ''){
    alert('Please provide all requird information');
  }else if(accNo.length != 4){
    alert('Enter 4 digits Account Number');
  }else{
    axios({
      method:'GET',
      url: 'http://192.168.0.102:8087/IDFC/Customer/getAccount/login/'+accNo,
    }).then(function(response){
       console.log("response", response.data.password);
       if(accNo == response.data.acc_no && uPassword == response.data.password){
        alert("Login Successfull");
        navigation.navigate("Home",{
          accNo: response.data.acc_no,
          uName: response.data.cust_name,
          uBalance: response.data.balance,
        });
      }else {
        alert("Invalid Account Holder");
      }
    }).catch(function(error){
      console.log("error",error);
    })
  }
  
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c0c4c4',
      alignItems: 'center',
      paddingVertical:70,
    },
    headtext: {fontSize:30, marginVertical:10, marginBottom:70,color:'#9c3024'},
    text:{fontSize:20, marginHorizontal:10, marginVertical:5, color:'#5e1810'},
    navtext:{fontSize:15, marginHorizontal:20, marginVertical:5, color:'#0D4C92'},
    TextInput:{height:40, width:300,borderWidth:1, paddingLeft:20, borderRadius:10, margin:7, backgroundColor: 'white'},
    Btn: {height:50, borderWidth:2, borderRadius:15, alignItems:'center', justifyContent:'center' ,backgroundColor:'#0D4C92',marginTop:25}
  });