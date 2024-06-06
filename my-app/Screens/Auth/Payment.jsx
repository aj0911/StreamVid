import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import GradientView from '../../Utils/GradientView'
import { FULLVIEW_HEIGHT, FULLVIEW_WIDTH } from '../../Utils/Helper'
import { Colors } from '../../assets/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../Reducers/AuthReducer'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import Loader from '../../Components/Loader'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'

const Payment = ({route,navigation}) => {

    //routes
    const {item} = route.params;
    const auth = useSelector(x=>x.auth)
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);

    //functions
    const handlePayment = async()=>{
        setIsLoading(true);
        try{
            const res = await axios.post(`https://streamvid-backend.vercel.app/user/update_subscription`,{
                ...auth.user,
                subscription:item
            })
            if(res.data.status === 200){
                Toast.show({
                    type:'success',
                    text1:'Check Out Success',
                    text2:res.data.message
                })
                dispatch(login(res.data.data));
                navigation.reset({
                    index:0,
                    routes:[{name:'Landing'}]
                })
              }
            else Toast.show({
                type:'error',
                text1:'Check Out Failed',
                text2:res.data.message
            })
        }
        catch(err){
            Toast.show({
                type:'error',
                text1:'Check Out Failed',
                text2:err.message
            })
        }
        finally{
            setIsLoading(false)
        }
    }
  if(isLoading) return <Loader/>
  return (
    <GradientView style={{
        width:FULLVIEW_WIDTH,
        height:FULLVIEW_HEIGHT,
        backgroundColor:Colors.bgColor,
        paddingHorizontal:.05*FULLVIEW_WIDTH
    }}>
      <ScrollView contentContainerStyle={{
        justifyContent:'flex-start',
        alignItems:'center',
        gap:20,
        minHeight:FULLVIEW_HEIGHT
      }} style={{
        width:'100%',
      }}>
        <Animated.View entering={FadeInUp.delay(100).duration(1000).springify()} style={{
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
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} style={{
            width:'100%',
            backgroundColor:Colors.secColorLight,
            padding:10,
            borderRadius:10,
            elevation:10,
            shadowRadius:20,
        }}>
            <Text style={{
                width:'100%',
                fontFamily:'Medium',
                color:Colors.secColorDark,
                fontSize:16
            }}>A Payment Gateway must be set up before any payment will be processed.</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(300).duration(1000).springify()} style={{
            width:'100%',
            backgroundColor:Colors.bgColorLight,
            elevation:10,
            shadowRadius:20,
            padding:20,
            borderWidth:2,
            borderColor:Colors.secColor,
            borderRadius:20,
            justifyContent:'flex-start',
            alignItems:'flex-start',
            gap:10
        }}>
            <Text style={{
                fontFamily:'ExtraBold',
                fontSize:20,
                color:Colors.secColor
            }}>Membership Level change</Text>
            <Text style={{
                fontFamily:'Bold',
                fontSize:16,
                color:Colors.textColor
            }}>You have selected the <Text style={{
                fontFamily:'ExtraBold',
                color:Colors.secColorDark
            }}>{item.name}</Text>  membership level.</Text>
            <View style={{
                justifyContent:'flex-start',
                alignItems:'flex-start',
                gap:5
            }}>
                {
                    item.features.map((x,i)=>(
                        <View style={{
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
                                fontFamily:'Medium',
                                color:Colors.secColorDark,
                                fontSize:14
                            }}>{x}</Text>
                        </View>
                    ))
                }
            </View>
            <Text style={{
                fontFamily:'Bold',
                fontSize:16,
                color:Colors.textColor
            }}>The price for membership is <Text style={{
                fontFamily:'ExtraBold',
                color:Colors.secColorDark
            }}>{item.amountString}</Text></Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} style={{
            width:'100%',
            backgroundColor:Colors.secColorLight,
            padding:10,
            borderRadius:10,
            elevation:10,
            shadowRadius:20,
        }}>
            <Text style={{
                width:'100%',
                fontFamily:'Medium',
                color:Colors.secColorDark,
                fontSize:16
            }}>You are logged in as {auth.user?.email}. If you would like to use a different account for this membership, <Text style={{fontFamily:'Bold'}} onPress={()=>{dispatch(logout());navigation.reset({
                index:0,
                routes:[{name:'Auth'}]
            })}}>log out now</Text></Text>
        </Animated.View>
        <Animated.View style={{width:'100%'}} entering={FadeInUp.delay(500).duration(1000).springify()}>
            <TouchableOpacity onPress={handlePayment} style={{
                paddingHorizontal:15,
                paddingVertical:7,
                borderWidth:2,
                borderColor:Colors.secColor,
                elevation:10,
                shadowRadius:20,
                borderRadius:5,
                elevation:10,
                shadowRadius:20,
                alignSelf:'flex-end',
            }}>
                <Text style={{
                fontSize:14,
                fontFamily:'Bold',
                color:Colors.secColor,
                textAlignVertical:'center',
                textAlign:'center'
                }}>Submit and Check Out</Text>
            </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </GradientView>
  )
}

export default Payment