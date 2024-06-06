import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import YoutubeVideo from 'react-native-youtube-iframe';
import { Constants, FULLVIEW_HEIGHT, FULLVIEW_WIDTH, convert0Number } from '../Utils/Helper';
import GradientView from '../Utils/GradientView';
import { Colors } from '../assets/Colors';
import Animated, { FadeInDown} from 'react-native-reanimated';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { movieStyleSheet } from '../Screens/Movies/Movie.style';
import { getGenres } from '../Utils/genre';

const YoutubePlayer = ({route,navigation}) => {

    // Getting Video Id
    const {video,recommendations,cast,type,episodes,data,episode_num} = route.params;
    const isMovie = Constants.MOVIES===type;
  return (
    <View style={{
        width:FULLVIEW_WIDTH,
        minHeight:FULLVIEW_HEIGHT,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.bgColor,
    }}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={movieStyleSheet.MD_Back}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.textColor} />  
        </TouchableOpacity>
            <GradientView style={{
                justifyContent:'flex-start',
                alignItems:'flex-start',
                width:'100%',
                height:'100%',
            }}> 
                <YoutubeVideo
                    play={true}
                    videoId={video.key}
                    height={220}
                    width='100%'
                />
                <View style={{
                    paddingHorizontal:.05*FULLVIEW_WIDTH,
                    justifyContent:'flex-start',
                    alignItems:'flex-start',
                    width:'100%',
                }}>
                    {
                        isMovie?null:
                        <Text style={{
                            fontFamily:'Bold',
                            color:Colors.secColor,
                            fontSize:16,
                            marginBottom:isMovie?20:5
                        }}>{episodes[episode_num].name} - S{convert0Number(data.seasonData.season_number)}E{convert0Number(episode_num+1)}
                        </Text>
                    }
                    <Text style={{
                        fontFamily:'Medium',
                        color:isMovie?Colors.textColor:Colors.secColorDark,
                        fontSize:isMovie?18:16, 
                        marginBottom:isMovie?20:10   
                    }}>{isMovie?data.title:`${data.series.name} - ${data.seasonData.name}`}</Text>
                    <View style={{
                        width:'100%',
                        justifyContent:'flex-start',
                        alignItems:'flex-start',
                        gap:10,
                        marginBottom:isMovie?20:10
                    }}>
                        <Text style={{
                            fontSize:18,
                            color:Colors.secColor,
                            fontFamily:'Medium',
                        }}>Cast</Text>
                        <View
                        style={{
                            width:'100%',
                        }}>
                        {
                            <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={cast.slice(0,10)}
                            renderItem={({item,index})=>{
                                if(!item.profile_path)return null
                                return(
                                    <Animated.View entering={FadeInDown.delay(200*(index+1)).duration(1000).springify()} key={index} style={{width:70,height:70,borderRadius:50,marginHorizontal:index===0?0:10,overflow:'hidden'}}>
                                        <TouchableOpacity onPress={()=>navigation.push('PersonDetails',{
                                            id:item.id
                                        })}>
                                        <Image 
                                            style={{
                                                width:'100%',
                                                height:'100%',
                                                objectFit:'fill'
                                            }}
                                        source={{uri:`https://image.tmdb.org/t/p/w500${item.profile_path}`}}/>
                                        </TouchableOpacity>
                                    </Animated.View>
                                )
                            }}
                            />
                        }
                        </View>
                    </View>
                    <View style={{
                        width:'100%'
                    }}>
                        <Text style={{
                            fontSize:18,
                            color:Colors.secColor,
                            fontFamily:'Medium',
                            marginBottom:10
                        }}>{isMovie?'Recommended':'Episodes'}</Text>
                        <FlatList
                         showsVerticalScrollIndicator = {false}
                         data={isMovie?recommendations:episodes}
                         style={{height:isMovie?FULLVIEW_HEIGHT/2.5:(FULLVIEW_HEIGHT/2.5) - 20}}
                         renderItem={({item,index})=>{
                                if(!item.backdrop_path && isMovie)return null
                                return(
                                <Animated.View entering={FadeInDown.delay(10*(index+2)).duration(1000).springify()} key={index} >
                                    {
                                        isMovie?
                                        <TouchableOpacity onPress={()=>navigation.push('MovieDetails',{id:item.id})} style={{
                                            width:'100%',
                                            marginVertical:10,
                                            flexDirection:'row',
                                            justifyContent:'center',
                                            alignItems:'center',
                                            gap:20,
                                            overflow:'hidden',
                                            borderRadius:10,
                                            elevation:50,
                                            borderWidth:1,
                                            borderColor:Colors.hoverColor,
                                            paddingRight:20,
                                            backgroundColor:Colors.hoverColor
                                        }}>
                                            <Image 
                                                style={{
                                                    width:'50%',
                                                    height:100,
                                                    objectFit:'cover',
                                                }}
                                            source={{uri:`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}/>
                                            <View style={{
                                                justifyContent:'center',
                                                alignItems:'flex-start',
                                                width:'50%',
                                                gap:10
                                            }}>
                                                <Text style={{
                                                    fontSize:12,
                                                    color:Colors.textColor,
                                                    fontFamily:'Medium',
                                                }}>{item.title}</Text>
                                                <Text style={{
                                                    fontSize:10,
                                                    color:Colors.secColorDark,
                                                    fontFamily:'Medium',
                                                }}>{(new Date(item.release_date)).toString().slice(4,15)}</Text>
                                                <Text style={{
                                                    fontSize:10,
                                                    color:Colors.secColorDark,
                                                    fontFamily:'Medium',
                                                }}>{getGenres(item.genre_ids)}</Text>
                                            </View>
                                            
                                        </TouchableOpacity>:
                                        <TouchableOpacity 
                                        onPress={()=>{
                                            navigation.push('YoutubePlayer',{
                                                video,
                                                cast,
                                                episodes,
                                                type,
                                                data,
                                                episode_num:index
                                              })
                                        }}
                                        disabled={item.runtime>0?false:true}
                                        style={{
                                            width:'100%',
                                            marginVertical:10,
                                            flexDirection:'row',
                                            justifyContent:'center',
                                            alignItems:'center',
                                            gap:10,
                                            overflow:'hidden',
                                            borderRadius:10,
                                            elevation:50,
                                            borderWidth:1,
                                            borderColor:index===episode_num?'rgba(255,255,255,.1)':Colors.hoverColor,
                                            paddingRight:20,
                                            backgroundColor:index===episode_num?'rgba(255,255,255,.1)':Colors.hoverColor
                                        }}>
                                            <View style={{
                                                width:'50%',
                                                position:"relative"
                                            }}>
                                                <Image 
                                                    style={{
                                                        height:100,
                                                        objectFit:'cover',
                                                    }}
                                                source={{uri:`https://image.tmdb.org/t/p/w500${item.still_path || data.series.poster_path}`}}/>
                                                {
                                                    item.runtime>0?
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
                                                        borderRadius:10,
                                                        padding:3
                                                    }}>
                                                        <FontAwesome name="play-circle-o" size={12} color={Colors.textColor} />
                                                        <Text style={{
                                                        fontFamily:'Medium',
                                                        fontSize:10,
                                                        color:Colors.textColor
                                                        }}>{(new Date(item.runtime * 60 * 1000)).toISOString().substr(11, 8)}</Text>
                                                    </View>:null
                                                }
                                            </View>
                                            <View style={{
                                                width:'50%',
                                                justifyContent:'center',
                                                alignItems:'flex-start',
                                                gap:10
                                            }}>
                                                <Text style={{
                                                    fontFamily:'Medium',
                                                    color:Colors.textColor,
                                                    fontSize:12
                                                }}>Episode {item.episode_number}</Text>
                                                <Text style={{
                                                    fontFamily:'Medium',
                                                    color:Colors.secColorDark,
                                                    fontSize:10
                                                }}>{(new Date(item.air_date)).toString().slice(4,15)}</Text>
                                                <Text style={{
                                                    fontFamily:'Medium',
                                                    color:Colors.secColorDark,
                                                    fontSize:10
                                                }}>{item.overview.slice(0,50)}{item.overview.length>50?'...':null}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </Animated.View>
                                )
                         }}
                        />
                    </View>
                </View>
            </GradientView>
    </View>
  )
}

export default YoutubePlayer