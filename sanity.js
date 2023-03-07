import sanityClient  from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {createClient} from '@sanity/client'


export const client = createClient({
    projectId: "jduku689",
    dataset: "production",
    useCdn: true,
    apiVersion:"2021-10-21",
})

const builder =imageUrlBuilder(client);
export const urlFor = (source)=>{

 return builder.image(source);

};