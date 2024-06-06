import { View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { HomeStyleSheet } from './Home.style'
import useFetch from '../../Utils/Hooks/useFetch'
import ListView from '../../Components/ListView'
import { Constants } from '../../Utils/Helper'
import Loader from '../../Components/Loader'
import Carousel from '../../Components/Carousel'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

  //states
  const navigation = useNavigation();
  const urls = [
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&sort_by=popularity.desc&with_original_language=ko`,
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.EXPO_PUBLIC_API_KEY}&with_original_language=hi&region=IN`,
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}`
  ];
  const views = [
    {
      name:'Trending Movies',
      islarge:false,
      type:Constants.MOVIES,
      showIndex:false
    },
    {
      name:'Latest Movies',
      islarge:false,
      type:Constants.MOVIES,
      showIndex:false
    },
    {
      name:'New Movies',
      islarge:false,
      type:Constants.MOVIES,
      showIndex:false
    },
    {
      name:'Top Rated',
      islarge:false,
      type:Constants.MOVIES,
      showIndex:true
    },
    {
      name:'New K-Dramas',
      islarge:false,
      type:Constants.SERIES,
      showIndex:false
    },
    {
      name:'Latest Series',
      islarge:true,
      type:Constants.SERIES,
      showIndex:false
    },
    {
      name:'Top Artists',
      islarge:false,
      type:Constants.PERSON,
      showIndex:false
    }
  ]
  const [data,isLoading,error] = useFetch(urls);
  
  useEffect(()=>{
    if(error) navigation.navigate('Error')
  },[error])
  return (
    <View style={{paddingBottom:100}}>
      {
        isLoading?
        <Loader/>:
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            data.length>0?
            <View style={HomeStyleSheet.home}>
              <Carousel data={data[0].results.slice(0,10)}/>
              {
                views.map((item,i)=>(
                  <ListView viewMore={i===3?false:true} key={i} islarge={item.islarge} data={data[i].results} title={item.name} type={item.type} showIndex={item.showIndex} />
                ))
              }
            </View>:''
          }
        </ScrollView>

      }
    </View>
  )
}

export default HomeScreen