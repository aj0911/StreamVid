import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import useFetch from '../../Utils/Hooks/useFetch';
import Loader from '../../Components/Loader';
import ListView from '../../Components/ListView';
import { Constants } from '../../Utils/Helper';
import { seriesStyleSheet } from './Series.style';
import Carousel from '../../Components/Carousel';

const SeriesScreen = () => {
  //states
  const urls = [
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&with_origin_country=IN&with_original_language=hi`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&with_genres=10749&sort_by=popularity.desc&with_original_language=ko`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&sort_by=popularity.desc&with_original_language=tr`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&sort_by=popularity.desc&with_original_language=ta`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&with_genres=10765,10759`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&with_origin_country=KR&with_original_language=ko&with_genres=10759`
  ];
  const views = [
    {
      name:'Featured TV Series',
      islarge:false,
      showIndex:false
    },
    {
      name:'Top Hindi Serials',
      islarge:false,
      showIndex:false
    },
    {
      name:'Romantic Kdramas',
      islarge:false,
      showIndex:false
    },
    {
      name:'Popular Turkish Dramas',
      islarge:true,
      showIndex:false
    },
    {
      name:'Best Southindian Shows',
      islarge:false,
      showIndex:false
    },
    {
      name:'TV Sci-Fi and Fantasy',
      islarge:false,
      showIndex:false
    },
    {
      name:'Kdramas for Action lovers',
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
            <View style={seriesStyleSheet.series}>
              <Carousel data={data[0].results.slice(0,10)}/>
              {
                views.map((item,i)=>(
                  <ListView key={i} islarge={item.islarge} data={data[i+1].results} title={item.name} type={Constants.SERIES} showIndex={item.showIndex} />
                ))
              }
            </View>:''
          }
        </ScrollView>

      }
    </View>
  )
}

export default SeriesScreen