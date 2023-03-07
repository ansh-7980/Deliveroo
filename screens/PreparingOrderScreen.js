import { View, Text  , SafeAreaView ,ProgressBarAndroid} from 'react-native'
import React ,{useEffect}from 'react'
import *  as Animatable  from "react-native-animatable";
// import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';


const PreparingOrderScreen = () => {
    const navigation = useNavigation();

useEffect(()=>{
    setTimeout(()=>{
        navigation.navigate("Delivery")
    } ,5000)
},[])
  return (
    <SafeAreaView style={{backgroundColor:"#00ccbb" , flex:1, justifyContent:"center" , alignItems:"center"}}>
        <Animatable.Image 
        source={require("../assets/order-preparing.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={{height: 300 , width: 300}}
        />
        <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={{fontWeight:"bold",color:"white" , fontSize:13 , alignItems:"center" ,marginTop:10}}
        >
         Waiting for restaurant to Accept your order 😋
        </Animatable.Text>



        {/* <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          color="white"
          size={60}
          progress={0.5} /> */}
          {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
        {/* <Progress.Circle size={30} indeterminate={true} color="white" />
         */}
         <ProgressBar color="white" size={60} indeterminate={true} style={{marginTop: 20}} />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen