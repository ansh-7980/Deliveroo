import { View, Text, SafeAreaView ,TouchableOpacity ,Image, ScrollView } from 'react-native'
import React ,{useState ,useMemo} from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { addToBasket, removeBasket, removeFromBasket, selectBasketItems, selectBasketTotal } from './../features/basketSlice';
import { useDispatch } from 'react-redux';
import  styled  from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { urlFor } from '../sanity';
import  Currency  from 'react-currency-formatter';

const BText = styled.Text`
font-size: 30px;
font-weight: bold;
color: #00ccbb;
`
const TitleText = styled.Text`
color: #00ccbb;
font-size: 15px;
`
const TitleView = styled.View`
align-items: center;
margin-top: 20px;
border-bottom: 5px solid #00ccbb;
`
const CTouch = styled.TouchableOpacity`
border-radius: 10px;
color: #00ccbb;
position: absolute;
top: 35px;
right: 5px;

`
const MView = styled.View`
flex:1;
background-color: white;

border-bottom: 5px solid #00ccbb;
`
const SView = styled.View`
padding: 5px;
border: 3px;
border-color: #00ccbb;
// border-bottom: 5px solid #00ccbb;
margin-bottom: 10px;

`
const DView = styled.View`
flex-direction: row;
align-items: center;
padding-left: 7px;
padding-right: 10px;
margin-right: 5px;
background-color: white;
padding-bottom: 10px;
`
const CartView = styled.View`
flex-direction: row;
align-items: center;
padding-top: 10px;
padding-right: 10px;
padding-left: 10px;
// background-color: lightgray;
padding-bottom: 10px;

`
const PriceView =styled.View`
padding: 5px;
margin-top: 5px;
// background-color: lightgray;
`
const PlaceOrder = styled.TouchableOpacity`
background-color: #00ccbb;
margin-top: 20px;
margin-bottom: 10px;
padding: 10px;
`

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [groupedItemsInBasket ,setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    console.log(restaurant);
    useMemo(()=>{
        const groupedItems = items.reduce((results,item)=>{
            (results[item.id]= results[item.id] ||[]).push(item);
            return results;
        },{})

        setGroupedItemsInBasket(groupedItems);
    },[items]);

  return (
    <SafeAreaView style={{flex:1 , backgroundColor:"white"}}>
     <MView>
        <SView>
            <TitleView>
                <BText>Basket</BText>
                <TitleText>{restaurant.title}</TitleText>
            </TitleView>
            <CTouch
            onPress={navigation.goBack}
            >
                <Entypo name="circle-with-cross" size={45} style={{height:50,width:50}}  color="#00ccbb" />
            </CTouch>
        </SView>

        <DView>
            <Image
            style={{height:50 , width: 50 , borderRadius:10 , borderColor:"red"}}
            source={{
                uri: "https://links.papareact.com/wru"
                
            }}
            />
            <Text style={{flex:1 ,paddingLeft: 8 ,color: "red"}}>Deliver in 50-70 minutes.</Text>
            <TouchableOpacity>
                <Text style={{color: "red"}}>Change</Text>
            </TouchableOpacity>
        </DView>

     
     <ScrollView >
        {Object.entries(groupedItemsInBasket).map(([key,items])=>(
            <CartView key={key} >
              <Text style={{color: "red"}}>{items.length} X</Text>
              <Image style={{height:50,width:50 , borderRadius:25 ,marginLeft:10 ,marginRight:10}}
              source={{uri:urlFor(items[0]?.image).url()}}
              />
              <Text style={{flex:1}}>{items[0]?.name}</Text>
              <Text style={{paddingRight: 10}}>
                <Currency quantity={items[0]?.price} currency="INR"/>
              </Text>
              <TouchableOpacity>
              {/* <Text 
                onPress={()=>dispatch(addToBasket({id: key}))}
                style={{color: "red" , fontSize: 17}}><AntDesign name="pluscircle" size={24} color="red" />  </Text> */}
                <Text 
                onPress={()=>dispatch(removeFromBasket({id: key}))}
                style={{color: "red" , fontSize: 17}}><AntDesign name="minuscircle" size={24} color="red" /> </Text>
              </TouchableOpacity>
            </CartView>

        ))}
     </ScrollView>

     <PriceView>
        <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
            <Text style={{color:"red"}}>SubTotal</Text>
            <Text style={{color:"red" ,fontWeight:"bold"}}>
                <Currency quantity={basketTotal} currency="INR" />
            </Text>
        </View>

        <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
            <Text style={{color:"red"}}>Delivery Fee</Text>
            <Text style={{color:"red" ,fontWeight:"bold"}}>
                <Currency quantity={60} currency="INR" />
            </Text>
        </View>

        <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
            <Text style={{color:"red"}}>GST Charges (18%)</Text>
            <Text style={{color:"red" ,fontWeight:"bold"}}>
                <Currency quantity={10} currency="INR" />
            </Text>
        </View>

        <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
            <Text style={{color:"red"}}>Order Total</Text>
            <Text style={{color:"red" ,fontWeight:"bold"}}>
                <Currency quantity={basketTotal+10+60} currency="INR" />
            </Text>
        </View>

        <PlaceOrder onPress={()=> navigation.navigate("PreparingOrderScreen")}>
            <Text style={{color:"white" , fontSize:20 , fontWeight: "bold" , textAlign:"center"}}>Place Order</Text>
        </PlaceOrder>
     </PriceView>


     </MView>
</SafeAreaView>
  )
}

export default BasketScreen