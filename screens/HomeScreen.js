import { View, Image, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect , useState } from 'react'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '../typography/TextComponent'
import { Ionicons, Feather } from '@expo/vector-icons';
import { Categories } from '../components/Categories';
import { FeaturedRow } from '../components/FeaturedRow';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {client} from '../sanity';
import 'react-native-url-polyfill/auto';
// import category from '../sanity/schemas/category';

const Main = styled(View)`
    flex-direction: row;
    padding: 10px;
`
const SearchContainer = styled(View)`
  width:90%;
`
const Search = styled(Searchbar)`
  // height:40px;
  margin-right:10px;
`

const StyledImage = styled(Image)`
    height:17px;
    width: 17px;
    padding: 20px;
    border-radius: 50px;
    background-color: grey;
    margin-right:8px;
`
export const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories , setFeaturedCategoires] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    }, [])
  })
useEffect(()=>{
  client.fetch(
    `
  *[_type =="featured"]{
    ...,
  restaurants[]->{
      ...,
      dishes[]->,
    
  }
}`
  )
  .then(data=>{
    setFeaturedCategoires(data)
  });
},[]);

// console.log(featuredCategories)

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex:1}}>
      <>
        <Main>
          <View>
            <StyledImage
              source={{
                uri: 'https://images.unsplash.com/photo-1672332311967-8d5d7b6a5c43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
              }}
            />
          </View>
          <View>
            <Text variant="caption">Deliver Now!</Text>
            <Text variant="label">Current Location
            <Entypo name="chevron-down" size={24} color="#00CCBB" />
            </Text>
          </View>
          <AntDesign name="user" size={40} color="#00CCBB" style={{marginLeft:"auto"}} />
        </Main>

        <Main>
          <SearchContainer>
            <Search iconColor="#00CCBB" placeholder="Restaurants and Cuisines" />
          </SearchContainer>
          <Feather name="sliders" style={{ marginTop: 12 }} size={25} color="#00CCBB" />
        </Main>

        <ScrollView>
          {/* Category */}
          <Categories/>
          {/* Featured */}

          {featuredCategories?.map((category)=>(

              <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description = {category.short_description}
              />
          ))}

        </ScrollView>
      </>
    </SafeAreaView>
  )
}