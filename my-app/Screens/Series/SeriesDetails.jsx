import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../../Utils/Hooks/useFetch';
import Loader from '../../Components/Loader';
import { movieStyleSheet } from '../Movies/Movie.style';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import GradientView from '../../Utils/GradientView';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../assets/Colors';
import ListView from '../../Components/ListView';
import { Constants, convert0Number } from '../../Utils/Helper';
import {Picker} from '@react-native-picker/picker';
import { seriesStyleSheet } from './Series.style';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../Reducers/ListReducer';
import Toast from 'react-native-toast-message';

const SeriesDetails = ({route,navigation}) => {
  // States
  const {id} = route.params;
  const [currentSeason,setCurrentSeason] = useState(1);
  const [data,isLoading,error] = useFetch([
      `https://api.themoviedb.org/3/tv/${id}/season/${currentSeason}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&append_to_response=videos,images,credits`,
      `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`,
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&append_to_response=videos,images`,
  ],[currentSeason]);
  const pickerRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector(x=>x.auth)
  const list = useSelector(x=>x.list)

  //Functions
  const isInTheWatchList = (id)=>{
    let flag = false;
    if(list.watchLater)
    list.watchLater.forEach(x=>{
        if(x.user.email===auth.user.email){
            x.items.forEach(y=>{
                if(y.id===id){
                    flag = true;
                }
            })
        }
    })
    return flag;
  } 

  //Rendering
  useEffect(()=>{
    if(error) navigation.navigate('Error')
  },[error])


  if(data.length>0 && !isLoading){
    const series = data[2];
    const recommendations = data[1].results;
    const seasonData = data[0];
    const starArr = [];
    const rating = Math.round(series.vote_average/2);
    let cast = '';
    seasonData.credits?.cast.slice(0,5).forEach(({name},index)=>{
      cast += name+`${(index===seasonData.credits?.cast.length -1 )?'':', '}`;
    })
    for(let i=1;i<=5;i++){
      if(rating-i>=0)starArr.push(true)
      else starArr.push(false)
    }
    const handlePlayNow = (episode_num)=>{
      if(series.videos?.results?.length>0){
        navigation.push('YoutubePlayer',{
          video:series.videos?.results[0],
          cast:seasonData.credits?.cast?.slice(0,5),
          episodes:seasonData.episodes,
          type:Constants.SERIES,
          data:{series,seasonData},
          episode_num
        })
      }
    }
    const flag = isInTheWatchList(id)
    return (
      <ScrollView>
        <View style={movieStyleSheet.MD}>
          <TouchableOpacity onPress={()=>navigation.goBack()} style={movieStyleSheet.MD_Back}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.textColor} />  
          </TouchableOpacity>
          <GradientView style={movieStyleSheet.MD_Banner}>
            <Image style={movieStyleSheet.MD_BGImg} source={{uri:`https://image.tmdb.org/t/p/original${series.poster_path}`}}/>
            <View style={movieStyleSheet.MD_Content}>
              <Animated.Image entering={FadeInUp.delay(100).duration(200).springify()} style={movieStyleSheet.MD_Img} source={{uri:`https://image.tmdb.org/t/p/w500${series.poster_path}`}}/>
              <Animated.Text entering={FadeInUp.delay(200).duration(200).springify()} style={movieStyleSheet.MD_Title}><Text style={{color:Colors.secColor,fontSize:32}}>{series.name[0]}</Text>{series.name.slice(1)}: {seasonData.name}</Animated.Text>
              <Animated.View entering={FadeInUp.delay(300).duration(200).springify()} style={movieStyleSheet.MD_ROW}>
                <View style={movieStyleSheet.MD_Stars}>
                  {
                    starArr.map((star,key)=>(
                      <AntDesign key={key} name="star" size={16} color={star?Colors.secColor:Colors.textColor} />
                    ))
                  }
                </View>
                <Text style={movieStyleSheet.MD_rowText}>{series.vote_average.toFixed(1)}</Text>
                <View style={movieStyleSheet.MD_dot}></View>
                <AntDesign name="eye" size={16} color={Colors.textColor} />
                <Text style={movieStyleSheet.MD_rowText}>{Math.round(series.popularity*series.vote_average)} Views</Text>
              </Animated.View>
              <Animated.View entering={FadeInUp.delay(400).duration(200).springify()} style={movieStyleSheet.MD_ROW}>
                <Text style={movieStyleSheet.MD_rowText}>{(new Date(series.first_air_date)).getFullYear()}</Text>
                <View style={movieStyleSheet.MD_dot}></View>
                <Text style={movieStyleSheet.MD_rowText}>{series.number_of_seasons} {series.number_of_seasons===1?'Season':'Seasons'}</Text>
              </Animated.View>
              <Animated.View entering={FadeInUp.delay(500).duration(200).springify()} style={movieStyleSheet.MD_ROW}>
                {
                  series.genres?.map((genre,index)=>(
                    <View key={index} style={{
                      flexDirection:'row',
                      gap:10,
                      alignItems:'center',
                      justifyContent:'center'
                    }}>
                      <Text style={movieStyleSheet.MD_rowText}>{genre.name}</Text>
                      {
                        (index===series.genres.length-1)?'':
                        <View style={movieStyleSheet.MD_dot}></View>
                      }
                    </View>
                  ))
                }
              </Animated.View>
              {
                series.overview &&
                <Animated.Text entering={FadeInUp.delay(600).duration(200).springify()} style={movieStyleSheet.MD_Para}>{series.overview.slice(0,200)}{series.overview.length>199?'...':null}</Animated.Text>
              }
              {
                cast?
                <Animated.Text entering={FadeInUp.delay(700).duration(200).springify()} style={movieStyleSheet.MD_rowText}><Text style={{fontSize:16,color:Colors.secColor}}>Cast : </Text>{cast}</Animated.Text>:''
              }
              {
                series.videos?.results?.length>0?
                <Animated.View entering={FadeInUp.delay(800).duration(200).springify()} style={movieStyleSheet.MD_Btns}>
                  <TouchableOpacity onPress={()=>handlePlayNow(0)} style={{...movieStyleSheet.MD_Btn,backgroundColor:Colors.secColor}}>
                    <Text style={movieStyleSheet.MD_Btn.text}>Play Now</Text>
                    <AntDesign name="play" size={16} color={Colors.textColor} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{
                    if(!flag){
                      dispatch(add({
                        user:auth.user,
                        item:{
                          id:series.id,
                          poster_path:series.poster_path,
                          type:Constants.SERIES
                      }}));
                      Toast.show({
                        type:'success',
                        text1:'Saved',
                        text2:'Item Saved to your Watchlist.'
                      })}
                      else{
                        dispatch(remove({user:auth.user,removeId:series.id}));
                        Toast.show({
                          type:'success',
                          text1:'Removed',
                          text2:'Item Removed from Watchlist.'
                        })
                      }
                      }} style={movieStyleSheet.MD_Btn}>
                      <Text style={{...movieStyleSheet.MD_Btn.text,color:flag?Colors.secColorGold:Colors.secColorLight}}>{flag?'Already Added':'Watch Later'}</Text>
                      <MaterialIcons name={flag?"done":'watch-later'} size={20} color={flag?Colors.secColorGold:Colors.secColorLight} />
                    </TouchableOpacity>
                </Animated.View>:
                <Animated.Text entering={FadeInUp.delay(800).duration(200).springify()} style={{...movieStyleSheet.MD_rowText,fontSize:16,color:Colors.secColorWarn}}>Video Not Available!!</Animated.Text >
              }
              <Animated.View entering={FadeInUp.delay(900).duration(200).springify()} style={{
                marginTop:20,
              }}>
                <TouchableOpacity onPress={()=>pickerRef.current.focus()} style={{...movieStyleSheet.MD_Btn,backgroundColor:Colors.secColor}}>
                  <Text style={movieStyleSheet.MD_Btn.text}>Season {currentSeason}</Text>
                  <AntDesign name="caretdown" size={16} color={Colors.textColor}/>
                  <Picker
                    selectedValue={currentSeason}
                    enabled={false}
                    style={{display:'none'}}
                    ref={pickerRef}
                    mode='dropdown'
                    onValueChange={(itemValue, itemIndex) =>
                      setCurrentSeason(itemValue)
                    }>
                      {
                        Array.from(Array(series.number_of_seasons).keys()).map((item,key)=>(
                          <Picker.Item  label={'Season '+Number(item+1)} key={key} value={key+1} Style={{
                            backgroundColor:Colors.secColor
                          }} />
                        ))
                      }
                  </Picker>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </GradientView>
          <View style={seriesStyleSheet.SD_EPISODES}>
            <Text style={seriesStyleSheet.SD_Title}>Episodes</Text>
            <FlatList
              horizontal
              data={seasonData.episodes}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              renderItem={({item,index})=>{
                return (
                  <TouchableOpacity onPress={()=>handlePlayNow(index)} key={index} style={seriesStyleSheet.SD_Episode}>
                    <View style={{
                      width:'100%',
                      position:'relative'
                    }}>
                      <Image style={{width:'100%',borderRadius:10,height:200}} source={{uri:`https://image.tmdb.org/t/p/original${item.still_path || series.poster_path}`}}/>
                      <View style={{
                        position:'absolute',
                        bottom:10,
                        left:10,
                        flexDirection:'row',
                        gap:5,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'rgba(0,0,0,0.5)',
                        backfaceVisibility:'hidden',
                        borderRadius:20,
                        padding:5
                      }}>
                        <FontAwesome name="play-circle-o" size={14} color={Colors.textColor} />
                        <Text style={{
                          fontFamily:'Medium',
                          fontSize:12,
                          color:Colors.textColor
                        }}>{(new Date(item.runtime * 60 * 1000)).toISOString().substr(11, 8)}</Text>
                      </View>
                    </View>
                    <Text style={{
                      fontFamily:'Bold',
                      fontSize:14,
                      color:Colors.textColor
                    }}>S{convert0Number(item.season_number)}E{convert0Number(item.episode_number)}</Text>
                    <Text style={{
                      fontFamily:'Bold',
                      fontSize:14,
                      color:Colors.secColor
                    }}>{item.name}</Text>
                    <Text style={{
                      fontFamily:'Medium',
                      fontSize:12,
                      color:Colors.secColorDark
                    }}>{item.overview.slice(0,200)}{item.overview.length>200?'...':null}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          <ListView title={'Cast & Crew'} type={Constants.PERSON} data={seasonData.credits?.cast?.slice(0,5)} viewMore={false}/>
          <ListView title={'More Like This'} type={Constants.SERIES} data={recommendations}/>
        </View>
      </ScrollView>
    )
  }
  else return <Loader/>
}

export default SeriesDetails