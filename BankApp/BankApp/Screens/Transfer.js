import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const Transfer = ({navigation, route}) => {
    const  accNo = route.params.accNo;
    const  uName = route.params.uName;
    const [amount, setAmount] = useState("");
    const [receiver, setReceiver] = useState("");

    const deposit = (accNo,amount,receiver) => {
        axios({
            method: 'POST',
            url: 'http://192.168.0.102:8087/IDFC/Customer/transfer/' + accNo +"/"+ amount +"/"+ receiver, 
        }).then(function(response){
            alert(JSON.stringify(response.data));
            setAmount("");
            navigation.navigate("Home",{uName});
        }).catch(function(error){
            console.log("error", error);
        })
    }
  return (
    <View style={[styles.container,{alignItems:'center'}]}>
            <View style={styles.headview}>
                <View style={{flexDirection: 'row',}}>
                    <Image source={require('../assets/bankLogo.jpg')} style={{height:70,width:70,borderRadius:2}}></Image>
                    <Text style={styles.headtext}>Central Bank</Text>
                </View>
                <Text style={[styles.userDetails,{fontSize:25}]}>Transfer your Amount {uName} !</Text>
            </View>
            <View style={{marginTop:30, marginBottom:40}}>
                <Text style={styles.text}>Enter Transfer Amount :</Text>
                <TextInput placeholder='Enter Amount' value={amount} style={styles.TextInput} onChangeText={(e) => setAmount(e)} keyboardType='numeric'></TextInput>
                <Text style={styles.text}>Enter Receiver Account Number:</Text>
                <TextInput placeholder='Enter Amount' value={receiver} style={styles.TextInput} onChangeText={(e) => setReceiver(e)} keyboardType='numeric'></TextInput>
                <TouchableOpacity style={styles.Btn} onPress={() => deposit(accNo,amount,receiver)}>
                    <Text style={{color:'white', fontSize:18, margin:2}}>Transfer Amount</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default Transfer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c0c4c4',
        paddingHorizontal:15
      },
      userDetails: {color:'white', fontSize:20, marginVertical:3},
      textHome: {color:'#9c3024', fontSize:25, marginVertical:2},
      headview:{backgroundColor:'#8a2d49',marginTop:50, paddingTop:40, paddingHorizontal:20, paddingBottom:30,borderRadius:30, borderBottomRightRadius:30,},
      headtext: {fontSize:40, marginVertical:10,marginHorizontal:20, marginBottom:40,color:'#e0aa3e'},
        text:{fontSize:20, marginHorizontal:10, marginVertical:5, color:'#0D4C92'},
        navtext:{fontSize:15, marginHorizontal:10, marginVertical:2, color:'#0D4C92'},
        TextInput:{height:40, width:300,borderWidth:1, paddingLeft:20, borderRadius:10, margin:7, backgroundColor: 'white'},
        Btn: {height:50, borderWidth:3, borderRadius:15, alignItems:'center', justifyContent:'center' ,backgroundColor:'#1657b8',marginTop:30}
})