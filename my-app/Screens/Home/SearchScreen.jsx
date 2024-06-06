import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GradientView from '../../Utils/GradientView'
import { Constants, FULLVIEW_HEIGHT, FULLVIEW_WIDTH, StatusBarHeight } from '../../Utils/Helper'
import { Colors } from '../../assets/Colors'
import { Ionicons } from '@expo/vector-icons'
import useFetch from '../../Utils/Hooks/useFetch'
import Loader from '../../Components/Loader'
import ListView from '../../Components/ListView'
import { useSelector } from 'react-redux'
import Animated, { FadeInUp } from 'react-native-reanimated'

const SearchScreen = ({navigation}) => {

  // States
  const [searchInput,setSearchInput] = useState('');
  const [tHeight,setTHeight] =  useState(0);
  const auth = useSelector(x=>x.auth);
  const [data,isLoading,error] = useFetch(searchInput===''?[
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}`
  ]:[
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&query=${searchInput}&append_to_response=videos,images,credits&page=1`,
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&query=${searchInput}&append_to_response=videos,images,credits`,
    `https://api.themoviedb.org/3/search/person?api_key=${process.env.EXPO_PUBLIC_API_KEY}&query=${searchInput}&append_to_response=videos,images,credits`
  ],[searchInput],{use:true,time:500});


  //Rendering
  useEffect(()=>{
    if(error) navigation.navigate('Error')
  },[error])

    return (
    <GradientView style={{
      width:FULLVIEW_WIDTH,
      height:FULLVIEW_HEIGHT,
      backgroundColor:Colors.bgColor,
      paddingVertical:20,
    }}>
      <View style={{
          width:'100%',
          justifyContent:'flex-start',
          alignItems:'center',
          gap:20, 
      }}>
        <View onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            gap:10,
            width:'100%',
            paddingHorizontal:.05*FULLVIEW_WIDTH,
        }}>
          <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{
              backgroundColor:Colors.secColorGold,
              borderRadius:10,
              padding:5,
            }}>
                <Ionicons name="arrow-back-outline" size={24} color={Colors.textColor} />  
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()}>
            <TouchableOpacity onPress={()=>navigation.push('User')} style={{
              backgroundColor:Colors.secColor,
              padding:10,
              borderRadius:50
            }} accessibilityRole='button'>
                <Text style={{
                  fontSize:16,
                  fontFamily:'Medium',
                  color:Colors.textColor,
                  textTransform:'uppercase'
                }}>{auth.user?.name.split(' ').map(x=>x[0]).splice(0,2)}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
          width:FULLVIEW_WIDTH*.9,
          backgroundColor:Colors.bgColorLight,
          flexDirection:'row',
          justifyContent:'flex-start',
          alignItems:'center',
          gap:10,
          padding:10,
          borderRadius:10,
        }}>
          <Ionicons name='search' size={20} color={Colors.secColor}/>
          <TextInput value={searchInput} style={{
            width:FULLVIEW_WIDTH*.9 - 50,
            fontFamily:'Medium',
            color:Colors.textColor,
            fontSize:16,
          }} placeholderTextColor={Colors.secColorDark} onChangeText={text=>setSearchInput(text)} placeholder='Search Movies, TV Shows...'/>
        </Animated.View>
        {
          (data.length>0 && !isLoading)?
          (data[0].results.length + data[1].results.length + data[2].results.length === 0 )?
          <View style={{
            width:'100%',
            height:FULLVIEW_HEIGHT - 80 - tHeight - StatusBarHeight,
            justifyContent:'center',
            alignItems:'center',
            gap:20
          }}>
            <Image style={{
              width:.7*FULLVIEW_WIDTH,
              height:200
            }} source={require('../../assets/Images/empty.png')}/>
            <Text style={{
              paddingHorizontal:.05*FULLVIEW_WIDTH,
              fontFamily:'Medium',
              color:Colors.secColorWarn,
              textAlign:'center',
              fontSize:16
            }}>No Results on Search!!</Text>
            <TouchableOpacity onPress={()=>setSearchInput('')} style={{
              backgroundColor:Colors.secColor,
              paddingHorizontal:15,
              paddingVertical:7,
              borderRadius:5,
              justifyContent:'center',
              alignItems:'center'
            }}>
            <Text style={{
              fontFamily:'Bold',
              color:Colors.textColor,
              fontSize:14,
            }}>Try Again</Text>
            </TouchableOpacity>
          </View>
          :
          <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{
              width:'100%',
              height:FULLVIEW_HEIGHT - 80 - tHeight - StatusBarHeight,
          }}>
            <ListView data={data[0].results} type={Constants.MOVIES} title={'Recommended Movies'}/>
            <ListView data={data[1].results} type={Constants.SERIES} title={'Recommended TV Shows'}/>
            <ListView data={data[2].results} type={Constants.PERSON} title={'Recommended Persons'}/>
          </ScrollView>:<Loader/>
        }
      </View> 
    </GradientView>
  )
}

export default SearchScreen