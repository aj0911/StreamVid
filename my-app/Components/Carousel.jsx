import { View, Text, StyleSheet, TouchableOpacity,FlatList,Image } from 'react-native'
import React, { useState } from 'react'
import GradientView from '../Utils/GradientView';
import { Constants, FULLVIEW_HEIGHT, FULLVIEW_WIDTH } from '../Utils/Helper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../assets/Colors';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getGenres } from '../Utils/genre';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../Reducers/ListReducer';
import Toast from 'react-native-toast-message';

const Carousel = ({data}) => {
    //Styles
    const styles = StyleSheet.create({
        banner:{
            height:'95%',
            width:FULLVIEW_WIDTH,
            paddingVertical:10,
        },
        imgContainer:{
            width:0.8*FULLVIEW_WIDTH,
            height:'100%',
            borderRadius:10,
            marginHorizontal:0.1*FULLVIEW_WIDTH,
            position:'relative',
        },
        img:{
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            borderRadius:10,
            objectFit:'fill'
        },
        layer:{
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            borderRadius:10,
            backgroundColor:'#000',
            opacity:.7,
        },
        content:{
            width:'100%',
            height:'100%',
            display:'flex',
            justifyContent:'flex-end',
            alignItems:'center',
            padding:15,
            paddingBottom:50
        },
        text:{
            fontFamily:'ExtraBold',
            fontSize:24,
            width:'100%',
            textAlign:'center',
            color:Colors.textColor
        },
        btns:{
            display:'flex',
            flexDirection:'row',
            gap:20,
            justifyContent:'center',
            alignItems:'center',
        },
        btn:{
            display:'flex',
            flexDirection:'row',
            gap:5,
            justifyContent:'center',
            alignItems:'center',
            paddingVertical:5,
            paddingHorizontal:10,
            borderRadius:3,
            text:{
                fontFamily:'Medium',
                color:Colors.textColor,
                fontSize:12,
                textAlign:'center'
            }
        },
        genreText:{
            fontFamily:'Bold',
            color:Colors.secColor,
            fontSize:12,
            textAlign:'center',
            marginBottom:5
        },
        dot:{
            width:3,
            height:3,
            borderRadius:50,
            backgroundColor:Colors.secColor
        },
        rowText:{
            fontFamily:'Bold',
            color:Colors.textColor,
            fontSize:12,
        }
    })

    //States
    const [bannerIndex,setBannerIndex] = useState(0);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const auth = useSelector(x=>x.auth)
    const list = useSelector(x=>x.list)

    //Functions
    const isInTheWatchList = (id)=>{
      let flag = false;
      if(list.watchLater)
      list.watchLater.forEach(x=>{
          if(x.user.email===auth.user?.email){
              x.items.forEach(y=>{
                  if(y.id===id){
                      flag = true;
                  }
              })
          }
      })
      return flag;
    }
    
  return (
    <GradientView style={{
        paddingTop:10,
        paddingBottom:20,
        height:FULLVIEW_HEIGHT/1.7,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:10,
      }}>
        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}  style={styles.banner}>
          <FlatList style={styles.list} showsHorizontalScrollIndicator={false} horizontal
          onScroll={e=>{
            const x = e.nativeEvent.contentOffset.x;
            setBannerIndex((x/FULLVIEW_WIDTH).toFixed(0))
          }}
          pagingEnabled data={data} renderItem={({item,index})=>{
            const flag = isInTheWatchList(item.id);
            return (
              <View style={styles.imgContainer} key={index}>
                <Image style={styles.img} source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}}/>
                <View style={styles.layer}></View>
                <View style={styles.content}>
                  <Text style={styles.genreText}>{getGenres(item.genre_ids)}</Text>
                  <Text style={styles.text}>{item.title || item.name}</Text>
                  <View style={{flexDirection:'row',gap:10,justifyContent:'center',alignItems:'center',marginBottom:20,marginTop:10}}>
                    <View style={{flexDirection:'row',gap:5,justifyContent:'center',alignItems:'center'}}>
                      <Ionicons name='star' color={Colors.secColor} size={12}/>
                      <Text style={styles.rowText}>{item.vote_average.toFixed(1)}</Text>
                    </View>
                    <View style={styles.dot}></View>
                    <Text style={styles.rowText}>{(new Date(item.release_date || item.first_air_date)).getFullYear()}</Text>
                  </View>
                  <View style={styles.btns}>
                    <TouchableOpacity onPress={()=>navigation.push(item.title?'MovieDetails':'SeriesDetails',{id:item.id})} style={{...styles.btn,backgroundColor:Colors.secColor}} accessibilityRole='button'>
                      <Text style={styles.btn.text}>Play Now</Text>
                      <AntDesign name="play" size={16} color={Colors.textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                      if(!flag){
                        dispatch(add({
                          user:auth.user,
                          item:{
                            id:item.id,
                            poster_path:item.poster_path,
                            type:item.name?Constants.SERIES:Constants.MOVIES
                        }}));
                        Toast.show({
                          type:'success',
                          text1:'Saved',
                          text2:'Item Saved to your Watchlist.'
                        })
                      }
                      else{
                        dispatch(remove({user:auth.user,removeId:item.id}));
                        Toast.show({
                          type:'success',
                          text1:'Removed',
                          text2:'Item Removed from Watchlist.'
                        })
                      }
                      }} style={{...styles.btn,backgroundColor:flag?Colors.secColorGold:Colors.textColor}}  accessibilityRole='button'>
                      <Text style={{...styles.btn.text,color:flag?Colors.hoverColor:Colors.bgColor}}>{flag?'Already Added':'Watch Later'}</Text>
                      <MaterialIcons name={flag?"done":'watch-later'} size={16} color={Colors.bgColor} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>                  
            )
          }} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          gap:5,
          width:FULLVIEW_WIDTH*0.8,
          height:'5%',
        }}>
          {
            data.map((_,i)=>(
              <View key={i} style={{
                width:7,
                height:7,
                borderRadius:50,
                backgroundColor:bannerIndex==i?Colors.secColor:Colors.hoverColor
              }}></View>
            ))
          }
        </Animated.View>
      </GradientView>
  )
}

export default Carousel