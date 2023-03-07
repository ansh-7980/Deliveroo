import { View, Text, ScrollView } from 'react-native'
import React ,{useState ,useEffect} from 'react'
import { CategoryCard } from './CategoryCard'
import { client, urlFor } from './../sanity';

export const Categories = () => {
    const [categories ,setCategoires] = useState([]);
 

    useEffect(()=>{
        client.fetch(`
        *[_type == "category"]
        `).then((data)=>{
            setCategoires(data);
        })

    },[])
    // console.log(categories);

    return (
        <ScrollView  style={{backgroundColor:'#fffff'}}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >

            {categories.map((category)=>(
                <CategoryCard 
                key={category._id}
                imgUrl={urlFor(category.image).width(300).height(300).url()}
                title={category.name} />


            ))}
           
            
        </ScrollView>
    )
}