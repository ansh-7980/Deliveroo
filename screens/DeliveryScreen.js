import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from './../features/restaurantSlice';
import styled  from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ProgressBar from 'react-native-progress/Bar';
import MapView ,{Marker} from 'react-native-maps';
const DView = styled.View`
flex:1;
background-color: #00ccbb;

`
const DeliveryView = styled.View`
margin-top: 20px
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 5px;
`
const DText = styled.Text`
margin-top: 10px;
color: #ffffff;
font-weight: bold;

`
const TimeView = styled.View`
background-color: white;
margin-left: 10px;
margin-right: 10px;
border: 1px;
padding-top: 10px;
padding: 6px;
z-index: 50;
`
const RiderView = styled.View`
margin-right: 150px;
`

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <DView>
      <SafeAreaView style={{zIndex:50}}>
        <DeliveryView>
          
          <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
          <Entypo name="circle-with-cross" size={45} color="#ffffff" />
          </TouchableOpacity>
          <DText>Order Help?</DText>
        </DeliveryView>

        <TimeView>
          <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
          <View>
            <Text style={{fontSize: 15,color: "black"}}>Estimated Arrival</Text>
            <Text style={{fontSize: 30 , fontWeight:"bold" , color: "black"}}>45-55 Minutes</Text>
          </View>
          <Image
            source={{
              uri:"https://links.papareact.com/fls"
            }}
            style={{height:100, width:100}}
          />
          </View>
          <ProgressBar color="#00ccbb" size={60} indeterminate={true}  />
          <Text style={{marginTop:9 ,fontSize:13 ,fontWeight:"bold"}}>
            Your Order at {restaurant.title} is Being Prepared
          </Text>
        </TimeView>
      </SafeAreaView>

      <MapView
      initialRegion={{
        latitude:restaurant.lat,
        longitude: restaurant.long,
        latitudeDelta:0.005,
        longitudeDelta:0.005,


      }
    }
    style={{flex:1, marginTop:10,zIndex:0}}
      >
        <Marker
        coordinate={{
          latitude:restaurant.lat,
          longitude:restaurant.long,

        }}
        title={restaurant.title}
        description={restaurant.short_description}
        identifier="origin"
        pinColor="#00ccbb"
        />

      </MapView>

      <SafeAreaView style={{flexDirection:"row" ,alignItems:"center",backgroundColor:"white" ,height:70 }}> 
        <Image 
        source={{
          uri:"https://links.papareact.com/wru"
        }}
        style={{height:60,width:60,padding:10,marginLeft:5 , borderRadius:20 ,marginRight:15}}
        />
        <RiderView>
          <Text style={{fontSize:14 , fontWeight:"bold"}}>Ram Setu</Text>
          <Text style={{fontSize:12 }}>Your Rider</Text>
        </RiderView>
        {/* <Text style={{fontSize:16 , fontWeight:"bold" , color:"#00ccbb"}} >Call</Text> */}
        <TouchableOpacity onPress={()=> navigation.navigate("Call")}>
        <Feather name="phone-call" size={26} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
    </DView>
  )
}

export default DeliveryScreen