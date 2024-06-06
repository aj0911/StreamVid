import { View,  ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { movieStyleSheet } from './Movie.style'
import Loader from '../../Components/Loader'
import useFetch from '../../Utils/Hooks/useFetch'
import ListView from '../../Components/ListView'
import { Constants } from '../../Utils/Helper'
import Carousel from '../../Components/Carousel'

const MoviesScreen = () => {
  //states
  const urls = [
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_original_language=hi`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_original_language=ko`,
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&with_genres=28&with_origin_country=IN`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&with_genres=10749&with_origin_country=IN`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&with_genres=35`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&sort_by=revenue.desc`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_original_language=ta`
  ];
  const views = [
    {
      name:'Korean Movies',
      islarge:false,
      showIndex:false
    },
    {
      name:'Featured Movies',
      islarge:false,
      showIndex:false
    },
    {
      name:'Bollywood Action Movies',
      islarge:false,
      showIndex:false
    },
    {
      name:'Best in Bollywood Romance',
      islarge:true,
      showIndex:false
    },
    {
      name:'Comedy Movies',
      islarge:false,
      showIndex:false
    },
    {
      name:'Blockbuster Movies',
      islarge:false,
      showIndex:false
    },
    {
      name:'South Indian Blockbusters',
      islarge:false,
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
            <View style={movieStyleSheet.movie}>
              <Carousel data={data[0].results.slice(0,10)}/>
              {
                views.map((item,i)=>(
                  <ListView key={i} islarge={item.islarge} data={data[i+1].results} title={item.name} type={Constants.MOVIES} showIndex={item.showIndex} />
                ))
              }
            </View>:''
          }
        </ScrollView>

      }
    </View>
  )
}

export default MoviesScreen