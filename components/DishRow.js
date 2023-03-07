import { View, Text ,TouchableOpacity ,Image} from 'react-native'
import React ,{useState} from 'react';
import Currency from "react-currency-formatter"
import  styled  from 'styled-components/native';
import { urlFor } from '../sanity';
import { AntDesign } from '@expo/vector-icons';
import {useDispatch ,useSelector} from "react-redux";
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';
import { selectBasketItems } from '../features/basketSlice';

const MainView = styled.View`
flex-direction: row;
`
const LView = styled.Text`
flex:1;
flex-direction: column;
padding:2px;
`
const NameText = styled.Text`
padding-top:20px;
font-size: 14px;
margin-bottom: 4px;
color: #00ccbb 
`
const DText= styled.Text`
// margin-right: 10px;
color: #00ccbb;
// padding-top:20px;
`
const CText = styled.Text`
// margin-top:2px;
`
const IconView = styled.View`

background-color: white;
padding-left:6px;
`
const IView = styled.View`
flex-direction: row;
align-items: center;
padding-bottom: 3px;
`

const DishRow = ({id, name, description, price, image}) => {
    const [isPressed ,setIsPressed] = useState(false);
    const items = useSelector((state)=> selectBasketItemsWithId(state,id));
    const dispatch = useDispatch();
    const addItemsToBasket = ()=>{
      dispatch(addToBasket({id,name,description,price,image}));
    }
    const removeItemFromBasket = ()=>{
      if(!items.length >0) return;
      dispatch(removeFromBasket({id}))
    }

  return (
    <>
    <TouchableOpacity
    onPress={()=> setIsPressed(!isPressed)}
    
    style={{backgroundColor:"white",padding:5 , borderColor:"#00ccbb"  }}>
      <MainView>
        <LView>
        <NameText>{name}</NameText>
        <DText>{description}</DText>
        <CText>
            <Currency quantity={price} currency ='INR'/>
        </CText>
        </LView>
        
        <View>
            <Image
               source={{uri: urlFor(image).url()}}
               style={{height:100, width:100 , borderWidth:2,borderColor:"#00ccbb" ,padding:4}}
            />
        </View>
      </MainView>
       
     </TouchableOpacity>
     
     {isPressed && (

      <IconView>
        <IView>
          <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
          <AntDesign style={{marginRight:9}} name="minuscircle" size={26} color={items.length >0 ? "#00ccbb" :"red"} />
          </TouchableOpacity>

          <Text style={{marginRight:9}} >{items.length}</Text>
          <TouchableOpacity onPress={addItemsToBasket}>
          <AntDesign style={{marginRight:9}} name="pluscircle" size={26} color="#00ccbb" />
          </TouchableOpacity>
        </IView>
      </IconView>
     )}
     
    </>
  )
  
}

export default DishRow