import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';


const Home = ({navigation, route}) => {
  const [accNo, setAccNo] = useState(route.params.accNo);
  const uName = route.params.uName ;
  const [uBalance ,setUBalance] = useState("");

  const balance = (accNo) => {
    axios({
      method:'GET',
      url: 'http://192.168.0.102:8087/IDFC/Customer/viewBalance/'+accNo,
    }).then(function(response){
      setUBalance((JSON.stringify(response.data)));
    }).catch(function(error){
      console.log("error",error);
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.headview}>
        <View style={{flexDirection: 'row',}}>
          <Image source={require('../assets/bankLogo.jpg')} style={{height:70,width:70,borderRadius:2}}></Image>
          <Text style={styles.headtext}>Central Bank</Text>
        </View>
        <Text style={[styles.userDetails,{fontSize:25}]}>Welcome to Central Bank {uName} !</Text>
        <Text style={styles.userDetails}>{uBalance}</Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.textHome,{marginTop:40}]}>                Select Operation </Text>
        <View style={{marginTop:30}}>
          <TouchableOpacity style={styles.Btn} onPress={() => balance(accNo)}>
            <Text style={{color:'white', fontSize:18, margin:2}}>View Balance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => {navigation.navigate("Deposit",{accNo ,uName});setUBalance("");}}>
            <Text style={{color:'white', fontSize:18, margin:2}}>Deposit Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => {navigation.navigate("Withdraw",{accNo ,uName});setUBalance("");}}>
            <Text style={{color:'white', fontSize:18, margin:2}}>Withdraw Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => {navigation.navigate("Transfer",{accNo ,uName});setUBalance("");}}>
            <Text style={{color:'white', fontSize:18, margin:2}}>Transfer Amount</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => {navigation.navigate("History",{accNo ,uName});setUBalance("");}}>
            <Text style={{color:'white', fontSize:18, margin:2}}>Transaction History</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0c4c4',
    paddingHorizontal:12
  },
  userDetails: {color:'white', fontSize:20, marginVertical:3},
  textHome: {color:'#9c3024', fontSize:25, marginVertical:2},
  headview:{backgroundColor:'#8a2d49',marginTop:50, paddingTop:40, paddingHorizontal:20, paddingBottom:30,borderRadius:20, borderBottomRightRadius:20,},
  headtext: {fontSize:40, marginVertical:10,marginHorizontal:20, marginBottom:40,color:'#e0aa3e'},
  text:{fontSize:20, marginHorizontal:10, marginVertical:5, color:'#0D4C92'},
  navtext:{fontSize:15, marginHorizontal:10, marginVertical:2, color:'#0D4C92'},
  TextInput:{height:40, width:300,borderWidth:1, paddingLeft:20, borderRadius:10, margin:7, backgroundColor: 'white'},
  Btn: {height:50, borderWidth:3, borderRadius:15, alignItems:'center', justifyContent:'center' ,backgroundColor:'#1657b8',marginTop:30}
})
