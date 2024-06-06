import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import GradientView from '../../Utils/GradientView'
import { Colors } from '../../assets/Colors'
import { FULLVIEW_HEIGHT, FULLVIEW_WIDTH, StatusBarHeight, subscriptions } from '../../Utils/Helper'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Reducers/AuthReducer'

const Subscription = ({navigation}) => {

  //states
  const [tHeight,setTHeight] = useState(0);
  const [bannerIndex,setBannerIndex] = useState(0);
  const dispatch = useDispatch();
  const auth = useSelector(x=>x.auth);

  return (
    <GradientView style={{
      backgroundColor:Colors.bgColor,
      width:FULLVIEW_WIDTH,
      height:FULLVIEW_HEIGHT,
      paddingVertical:20,
      justifyContent:'flex-start',
      alignItems:'center',
      gap:20
    }}>
      <Animated.View entering={FadeInUp.delay(100).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:10,
        width:.9*FULLVIEW_WIDTH
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
      <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
        width:.9*FULLVIEW_WIDTH,
        textAlign:'center',
        fontFamily:'Bold',
        color:Colors.secColor,
        textTransform:'capitalize',
        fontSize:24,
        marginTop:30
      }}>Choose the plan that suits for you</Animated.Text>
      <Animated.Text entering={FadeInUp.delay(300).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
        width:.9*FULLVIEW_WIDTH,
        textAlign:'center',
        fontFamily:'Medium',
        color:Colors.textColor,
        fontSize:14
      }}>We present 3 packages that you can choose to start watching various movies you like at low prices and according to your needs</Animated.Text>
      <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()}  style={{
        maxHeight:(FULLVIEW_HEIGHT - 130 - tHeight - StatusBarHeight),
        width:'100%',
        justifyContent:"flex-start",
        alignItems:'center',
        gap:30
      }}>
        <FlatList
        showsHorizontalScrollIndicator={false} 
        horizontal
        onScroll={e=>{
          const x = e.nativeEvent.contentOffset.x;
          setBannerIndex((x/FULLVIEW_WIDTH).toFixed(0))
        }}
        pagingEnabled data={subscriptions} renderItem={({item,index})=>{
          const flag  =auth.user?.subscription?.name===item.name;
          return(
            <View style={{
              width:FULLVIEW_WIDTH*.8,
              justifyContent:'center',
              alignItems:'center',
              gap:10,
              padding:20,
              backgroundColor:Colors.hoverColor,
              borderRadius:20,
              marginHorizontal:.1*FULLVIEW_WIDTH,
              elevation:10,
              shadowRadius:20,
              marginVertical:20
            }} key={index}>
                <Text style={{
                  fontFamily:'Bold',
                  fontSize:20,
                  color:Colors.textColor,
                  width:'100%',
                  textAlign:'center'
                }}>{item.name}</Text>
                <Text style={{
                  fontFamily:'Bold',
                  fontSize:18,
                  color:Colors.secColor,
                  width:'100%',
                  textAlign:'center'
                }}>{item.amountString}</Text>
                <View style={{
                  justifyContent:'flex-start',
                  alignItems:'center',
                  gap:5,
                  width:'100%'
                }}>
                  {
                    item.features.map((x,i)=>(
                      <View style={{
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        alignItems:'center',
                        gap:10
                      }} key={i}>
                        <View style={{
                          width:7,
                          height:7,
                          borderRadius:50,
                          backgroundColor:Colors.secColor
                        }}></View>
                        <Text style={{
                          color:Colors.secColorDark,
                          fontSize:12,
                          fontFamily:'Medium'
                        }}>{x}</Text>
                      </View>
                    ))
                  }
                </View>
                <TouchableOpacity onPress={()=>navigation.push('Payment',{item})} style={{
                  paddingHorizontal:15,
                  paddingVertical:7,
                  borderWidth:2,
                  borderColor:flag?Colors.secColorGold:Colors.secColor,
                  borderRadius:5,
                  backgroundColor:flag?Colors.secColorGold:'transparent',
                  elevation:10,
                  shadowRadius:20
                }} disabled={flag}>
                  <Text style={{
                    fontSize:14,
                    fontFamily:'Bold',
                    color:flag?Colors.secColorDark:Colors.textColor,
                    textAlignVertical:'center',
                    textAlign:'center'
                  }}>
                    {
                      flag?'Your Level':'Choose Plan'
                    }
                  </Text>
                </TouchableOpacity>
            </View>
          )
        }} />
        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          gap:5,
          width:'100%',
        }}>
          {
            subscriptions.map((_,i)=>(
              <View key={i} style={{
                width:7,
                height:7,
                borderRadius:50,
                backgroundColor:bannerIndex==i?Colors.secColor:Colors.hoverColor
              }}></View>
            ))
          }
        </Animated.View>
      </Animated.View>
    </GradientView>
  )
}

export default Subscription