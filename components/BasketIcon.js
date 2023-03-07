import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from './../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import  styled  from 'styled-components/native';
import  Currency from 'react-currency-formatter';

const BView = styled(View)`
position: absolute;
bottom: 6px;
width: 100%;
z-index:50;
`
const BasketText = styled.Text`
flex:1;
color:white;
margin-top: 5px;
margin-right:20px;
font-weight:bold;
font-size: 15px;
align-items: center;
padding-bottom:10px;
`

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    if(items.length === 0) return null;
  return (
    <BView>
        <TouchableOpacity onPress={()=>navigation.navigate("Basket")} style={{marginLeft:5,backgroundColor:"#00ccbb", flexDirection:"row",borderRadius:5,alignItems:"center",marginRight:10,paddingTop:20}}>
        <Text style={{color:"white",marginLeft:5,marginRight:60,fontWeight:"bold" ,backgroundColor:"#01a296" ,paddingLeft:7 ,paddingRight:7}}>{items.length}</Text>
        <BasketText >View Basket</BasketText>
        <Text style={{color:"white",marginRight:20 ,fontSize:18 ,fontWeight:"bold" }}>
            <Currency style={{alignItems:"center"}} quantity={basketTotal} currency="INR"/>
        </Text>
        </TouchableOpacity>
     
    </BView>
  )
}

export default BasketIcon