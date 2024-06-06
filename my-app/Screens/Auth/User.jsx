import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GradientView from '../../Utils/GradientView';
import { FULLVIEW_HEIGHT, FULLVIEW_WIDTH, StatusBarHeight, getNavigationType } from '../../Utils/Helper';
import { Colors } from '../../assets/Colors';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { logout } from '../../Reducers/AuthReducer';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { remove } from '../../Reducers/ListReducer';
import Toast from 'react-native-toast-message';

const User = ({navigation}) => {

  //States
  const {watchLater} = useSelector(x=>x.list);
  const dispatch = useDispatch();
  const auth = useSelector(x=>x.auth);
  const [tHeight,setTHeight] = useState(0);
  const data = watchLater.filter(x=>x.user._id === auth.user?._id)[0]?.items
  return (
    <GradientView style={{
      width:FULLVIEW_WIDTH,
      height:FULLVIEW_HEIGHT,
      backgroundColor:Colors.bgColor,
      paddingVertical:20
    }}>
      <View style={{
        width:'100%',
        paddingHorizontal:.05*FULLVIEW_WIDTH,
        justifyContent:'flex-start',
        alignItems:'center',
        gap:20
      }}>
        <Animated.View entering={FadeInUp.delay(100).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          gap:10,
          width:'100%'
        }}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{
                backgroundColor:Colors.secColorGold,
                borderRadius:10,
                padding:5,
            }}>
                <Ionicons name="arrow-back-outline" size={24} color={Colors.textColor} />  
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:Colors.secColor,
                paddingHorizontal:15,
                paddingVertical:7,
                borderRadius:5
            }} onPress={()=>{dispatch(logout());navigation.reset({
              index:0,
              routes:[{name:'Auth'}]
            })}} accessibilityRole='button'>
              <View style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:5
              }}> 
                <Text style={{
                    fontSize:16,
                    fontFamily:'Medium',
                    color:Colors.textColor,
                    textTransform:'uppercase',
                }}>Logout </Text>
                <Ionicons color={Colors.secColorWarn} name='log-out' size={20} />
              </View>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
          justifyContent:'center',
          alignItems:'center',
          gap:20,
          flexDirection:'row'
        }}>
          <View style={{
            backgroundColor:Colors.secColor,
            borderRadius:50,
            padding:10,
          }}>
            <Text style={{
              fontSize:24,
              fontFamily:'ExtraBold',
              textAlign:'center',
              textAlignVertical:'center',
              color:Colors.textColor,
              textTransform:'uppercase'
            }}>{auth.user?.name.split(' ').map(x=>x[0]).splice(0,2)}</Text>
          </View>
          <View style={{
            justifyContent:'center',
            alignItems:'flex-start',
            gap:5
          }}>
            <View style={{
              justifyContent:'center',
              alignItems:'center',
              gap:10,
              flexDirection:'row'
            }}>
              <Text style={{
                fontFamily:'Medium',
                fontSize:16,
                color:Colors.textColor
              }}>{auth.user?.name}</Text>
              <View style={{
                padding:3,
                backgroundColor:Colors.secColor,
                borderRadius:50
              }}>
                <MaterialIcons size={10} name='done' color={Colors.textColor} />
              </View>
            </View>
            <Text style={{
              fontFamily:'Medium',
              fontSize:14,
              color:Colors.secColorDark
            }}>{auth.user?.email}</Text>
          </View>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(300).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
          width:'100%',
          backgroundColor:Colors.hoverColor,
          borderColor:Colors.secColor,
          borderBottomWidth:2,
          padding:7
        }}>
          <Text style={{
            width:'100%',
            textAlign:'center',
            textAlignVertical:'center',
            fontFamily:'Bold',
            fontSize:16,
            color:Colors.secColor
          }}>WatchList</Text>
        </Animated.View>
        {
          (!data || data.length===0)?
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{
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
            <TouchableOpacity onPress={()=>navigation.push('Search')} style={{
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
            }}>Search</Text>
            </TouchableOpacity>
          </Animated.View>
          :
          <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{
              width:'100%',
              height:FULLVIEW_HEIGHT - 100 - tHeight - StatusBarHeight,
          }}>
            <View style={{
                    flexDirection:'row',
                    flexWrap:'wrap',
                    width:'100%',
                    justifyContent:'flex-start',
                    alignItems:'center',
                    gap:20
                }}>
                    {
                        data.map((item,index)=>{
                        return(
                            <Animated.View entering={FadeInDown.delay(100*(index+1)).duration(1000).springify()} style={{
                                overflow:'hidden',
                                width:(.9*FULLVIEW_WIDTH - 40)/3,
                                borderRadius:10,
                                position:'relative'
                            }} key={index}>
                                <TouchableOpacity onPress={()=>navigation.push(getNavigationType(item.type),{id:item.id})} >
                                    <Image style={{
                                        width:'100%',
                                        height:150,
                                        objectFit:'fill'
                                    }} source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}/>
                                    <TouchableOpacity onPress={()=>{
                                      dispatch(remove({user:auth.user,removeId:item.id}));
                                      Toast.show({
                                        type:'success',
                                        text1:'Removed',
                                        text2:'Item Removed from Watchlist.'
                                      })
                                    }} style={{
                                      padding:1,
                                      backgroundColor:Colors.secColorWarn,
                                      borderRadius:50,
                                      position:'absolute',
                                      top:10,
                                      right:10,
                                      width:25,
                                      height:25,
                                      justifyContent:'center',
                                      alignItems:'center'
                                    }}>
                                      <FontAwesome size={14} name='remove' color={Colors.textColor} />
                                    </TouchableOpacity>
                                </TouchableOpacity>  
                            </Animated.View>
                        )})
                    }
                </View>
          </ScrollView>
        }
      </View>
    </GradientView>
  )
}

export default User