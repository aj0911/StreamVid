import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useState }  from 'react'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { FULLVIEW_HEIGHT, FULLVIEW_WIDTH, StatusBarHeight, getImgPath, getNavigationType } from '../Utils/Helper';
import GradientView from '../Utils/GradientView';
import { Colors } from '../assets/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const ViewMore = ({route,navigation}) => {

    // states
    const {title,data,type} = route.params;
    const [tHeight,setTHeight] = useState(0);
    const auth = useSelector(x=>x.auth)

  return (
    <GradientView style={{
        width:FULLVIEW_WIDTH,
        height:FULLVIEW_HEIGHT,
        backgroundColor:Colors.bgColor,
        paddingHorizontal:.05*FULLVIEW_WIDTH,
        paddingVertical:20,
        position:'relative'
    }}>
        <View style={{
            width:'100%',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            gap:20,
        }}>
            <Animated.View entering={FadeInUp.delay(100).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              gap:10,
              width:'100%',
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
                    padding:10,
                    borderRadius:50
                }} onPress={()=>navigation.push('User')} accessibilityRole='button'>
                    <Text style={{
                        fontSize:16,
                        fontFamily:'Medium',
                        color:Colors.textColor,
                        textTransform:'uppercase'
                    }}>{auth.user?.name.split(' ').map(x=>x[0]).splice(0,2)}</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} onLayout={e=>setTHeight(tHeight+e.nativeEvent.layout.height)} style={{
                fontFamily:'Bold',
                color:Colors.secColor,
                fontSize:18,
                width:'100%',

            }}>{title}</Animated.Text>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{
                width:'100%',
                height:FULLVIEW_HEIGHT - 80 - tHeight - StatusBarHeight
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
                        if(getImgPath(type,item)!==null)
                        return(
                            <Animated.View entering={FadeInDown.delay(100*(index+1)).duration(1000).springify()} style={{
                                overflow:'hidden',
                                width:(.9*FULLVIEW_WIDTH - 40)/3,
                                borderRadius:10
                            }} key={index}>
                                <TouchableOpacity onPress={()=>navigation.push(getNavigationType(type),{id:item.id})} >
                                    <Image style={{
                                        width:'100%',
                                        height:150,
                                        objectFit:'fill'
                                    }} source={{uri:`https://image.tmdb.org/t/p/w500${getImgPath(type,item)}`}}/>
                                </TouchableOpacity>  
                            </Animated.View>
                        )})
                    }
                </View>
            </ScrollView>
        </View>
    </GradientView>
  )
}

export default ViewMore