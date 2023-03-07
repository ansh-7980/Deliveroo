import { View, Image, ScrollView ,TouchableOpacity} from 'react-native'
import React ,{useLayoutEffect ,useEffect }from 'react'
import {useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import  styled  from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Text } from './../typography/TextComponent';
import DishRow from './../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantView = styled.View`
padding-top:10px;
padding-left:5px;
font-weight: bold;
`
const MainView= styled.View`
background-color: white;


`
const RestText = styled.Text`
font-weight: bold;
font-size: 25px;
color: #00CCBB;
`
const SubView = styled.View`
flex-direction: row;
// margin-right: 1px;
`
const SubbView = styled.View`
flex-direction: row;
margin-right: 10px;
align-items: center;

`
const DescriptionText = styled.Text`
color: gray;
margin-top: 10px;
padding-bottom:20px;
`
const DeText = styled.Text`
padding-left: 2px;
flex:1;
font-weight: bold;
color:#00ccbb;

`
const MenuText = styled.Text`
padding-left:4px;
padding-top:6px;
font-weight:bold;
font-size:20px;
color:#00ccbb;
`
const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
    },
} = useRoute();

useEffect(()=>{
  dispatch(setRestaurant({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
  }))
},[])

useLayoutEffect(()=>{
  navigation.setOptions({
    headerShown: false,
  })
},[])

  return (

    <>
    <BasketIcon />
    <ScrollView>
      <View style={{position:"relative"}}>
         <Image 
            source={{
              uri:urlFor(imgUrl).url(),
            }}
            style={{width:"auto",height:300 }}
         />
         <TouchableOpacity 
         onPress={navigation.goBack}
         style={{position:"absolute" ,marginTop:25 , marginLeft:10 ,backgroundColor:"white",borderRadius:20}}>
         <AntDesign name="arrowleft" size={40} color="#00CCBB" />
         </TouchableOpacity>
      </View>

      <MainView>
        <RestaurantView>
          <RestText>{title}</RestText>
          <SubView>
            <SubbView>
            <Ionicons name="star-half" size={25} color="#00CCBB" />
          <Text variant="caption">
            <Text variant="green"> {rating}</Text> - {genre}
          </Text>
            </SubbView>


            <SubbView>
            <Entypo name="location" size={24} color="#00ccbb" />
            <Text variant="caption">
            <Text variant="green">Nearby-{address}</Text>
          </Text>
            </SubbView>
           
          </SubView>
          <DescriptionText>{short_description}</DescriptionText>
        
        </RestaurantView>

        <TouchableOpacity style={{flexDirection:"row" , alignItems:"center",padding:10, borderColor:"#00ccbb" ,borderWidth:2}}>
         <AntDesign name="questioncircleo" size={26} color="#00CCBB" />
         <DeText> Have a Food Allergy???</DeText>
         <Entypo name="chevron-right" size={26} color="#00CCBB" />

      </TouchableOpacity>

      </MainView>

      <View style={{paddingBottom:36}}>
        <MenuText>Menu</MenuText>
        {dishes.map((dish) => (
                        <DishRow
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                        />
                    ))}
      </View>
     </ScrollView>
     </>
  )
}

export default RestaurantScreen