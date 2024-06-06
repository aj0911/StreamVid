import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Loader from '../../Components/Loader';
import useFetch from '../../Utils/Hooks/useFetch';
import { movieStyleSheet } from './Movie.style';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../assets/Colors';
import ListView from '../../Components/ListView';
import { Constants } from '../../Utils/Helper';
import GradientView from '../../Utils/GradientView';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../Reducers/ListReducer';
import Toast from 'react-native-toast-message';

const MovieDetails = ({route,navigation}) => {

    // States
    const {id} = route.params;
    const [data,isLoading,error] = useFetch([
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&append_to_response=videos,images,credits`,
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`
    ]);
    const dispatch = useDispatch();
    const auth = useSelector(x=>x.auth)
    const list = useSelector(x=>x.list)

    //Function
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

    if(data.length>0  && !isLoading){
      const movie = data[0];
      const recommendations = data[1].results;
      const starArr = [];
      const rating = Math.round(movie.vote_average/2);
      let cast = '';
      movie.credits?.cast.slice(0,5).forEach(({name},index)=>{
        cast += name+`${(index===movie.credits?.cast.length -1 )?'':', '}`;
      })
      for(let i=1;i<=5;i++){
        if(rating-i>=0)starArr.push(true)
        else starArr.push(false)
      }
      const handlePlayNow = ()=>{
        if(movie.videos?.results.length>0){
          navigation.push('YoutubePlayer',{
            video:movie.videos?.results[0],
            cast:movie.credits?.cast,
            recommendations,
            type:Constants.MOVIES,
            data:movie
          })
        }
      }
      const flag  = isInTheWatchList(id);
      return (
        <ScrollView>
          <View style={movieStyleSheet.MD}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={movieStyleSheet.MD_Back}>
              <Ionicons name="arrow-back-outline" size={24} color={Colors.textColor} />  
            </TouchableOpacity>
            <GradientView style={movieStyleSheet.MD_Banner}>
              <Image style={movieStyleSheet.MD_BGImg} source={{uri:`https://image.tmdb.org/t/p/original${movie.poster_path}`}}/>
              <View style={movieStyleSheet.MD_Content}>
                <Animated.Image entering={FadeInUp.delay(100).duration(200).springify()} style={movieStyleSheet.MD_Img} source={{uri:`https://image.tmdb.org/t/p/w500${movie.poster_path}`}}/>
                <Animated.Text entering={FadeInUp.delay(200).duration(200).springify()} style={movieStyleSheet.MD_Title}><Text style={{color:Colors.secColor,fontSize:32}}>{movie.title[0]}</Text>{movie.title.slice(1)}</Animated.Text>
                <Animated.View entering={FadeInUp.delay(300).duration(200).springify()} style={movieStyleSheet.MD_ROW}>
                  <View style={movieStyleSheet.MD_Stars}>
                    {
                      starArr.map((star,key)=>(
                        <AntDesign key={key} name="star" size={16} color={star?Colors.secColor:Colors.textColor} />
                      ))
                    }
                  </View>
                  <Text style={movieStyleSheet.MD_rowText}>{movie.vote_average.toFixed(1)}</Text>
                  <View style={movieStyleSheet.MD_dot}></View>
                  <AntDesign name="eye" size={16} color={Colors.textColor} />
                  <Text style={movieStyleSheet.MD_rowText}>{Math.round(movie.popularity*movie.vote_average)} Views</Text>
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(400).duration(200).springify()} style={movieStyleSheet.MD_ROW}>
                  <Text style={movieStyleSheet.MD_rowText}>{(new Date(movie.release_date)).getFullYear()}</Text>
                  <View style={movieStyleSheet.MD_dot}></View>
                  <Text style={movieStyleSheet.MD_rowText}>{(Math.floor(movie.runtime/60)>=1)?`${Math.floor(movie.runtime/60)} hr `:``}{(movie.runtime%60===0)?``:`${movie.runtime%60} mins `}</Text>
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(500).duration(200).springify()} style={movieStyleSheet.MD_ROW}>
                  {
                    movie.genres?.map((genre,index)=>(
                      <View key={index} style={{
                        flexDirection:'row',
                        gap:10,
                        alignItems:'center',
                        justifyContent:'center'
                      }}>
                        <Text style={movieStyleSheet.MD_rowText}>{genre.name}</Text>
                        {
                          (index===movie.genres.length-1)?'':
                          <View style={movieStyleSheet.MD_dot}></View>
                        }
                      </View>
                    ))
                  }
                </Animated.View>
                {
                  movie.overview &&
                  <Animated.Text entering={FadeInUp.delay(600).duration(200).springify()} style={movieStyleSheet.MD_Para}>{movie.overview.slice(0,200)}{movie.overview.length>199?'...':null}</Animated.Text>
                }
                <Animated.Text entering={FadeInUp.delay(700).duration(200).springify()} style={movieStyleSheet.MD_rowText}><Text style={{fontSize:16,color:Colors.secColor}}>Cast : </Text>{cast}</Animated.Text>
                {
                  movie.videos?.results?.length>0?
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
                          id:movie.id,
                          poster_path:movie.poster_path,
                          type:Constants.MOVIES
                      }}));
                      Toast.show({
                        type:'success',
                        text1:'Saved',
                        text2:'Item Saved to your Watchlist.'
                      })}
                      else{
                        dispatch(remove({user:auth.user,removeId:movie.id}));
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
              </View>
              
            </GradientView>
            <ListView title={'Cast & Crew'} type={Constants.PERSON} data={movie.credits?.cast?.slice(0,5)} viewMore={false}/>
            <ListView title={'More Like This'} type={Constants.MOVIES} data={recommendations}/>
          </View>
        </ScrollView>
      )
    }
    else return <Loader/>
}

export default MovieDetails