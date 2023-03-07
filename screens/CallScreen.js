import { View, Text } from 'react-native'
import React from 'react'
import  styled  from 'styled-components/native';
import *  as Animatable  from "react-native-animatable";
const CallView = styled.View`
background-color: #00ccbb;
align-items: center;
flex:1;

`
const CallText = styled.Text`
margin-top: 50px;
color: white;
font-size:30px;
font-weight: bold;
`
const CText = styled.Text`
color: white;
padding-top: 30px;
font-weight: bold;
padding-bottom:50px

`
const CallScreen = () => {
  return (
    <CallView >
      <CallText>Wanna Call?</CallText>
      <CText>Contact me :123456789</CText>
      <Animatable.Image 
        source={require("../assets/call2.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={{height: 200 , width: 340}}
        />
    </CallView>
  )
}

export default CallScreen