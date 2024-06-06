import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Colors } from '../assets/Colors'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Animated, { FadeInUp } from 'react-native-reanimated'

const HeaderBar = () => {
    
    //Navigation
    const navigation = useNavigation();
    const auth = useSelector(state=>state.auth)

  return (
    <View style={style.header}>
      <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={style.left} source={require('../assets/Images/logo-bgRemove.png')}/>
      <View style={style.right}>
        <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()}>
            <TouchableOpacity onPress={()=>navigation.push('Search')}>
                <Feather name="search" size={24} color={Colors.textColor} />
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()}>
            <TouchableOpacity onPress={()=>navigation.push('User')} style={style.btn1} accessibilityRole='button'>
                <Text style={style.btn2.text}>{auth.user?.name.split(' ').map(x=>x[0]).splice(0,2)}</Text>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(800).duration(1000).springify()}>
            <TouchableOpacity onPress={()=>navigation.push('Subscription')} style={style.btn2} accessibilityRole='button'>
                <Text style={style.btn2.text}>
                {(auth.user?.subscription)?auth.user?.subscription.name.split(' ')[0]:'Subscribe'}
                </Text>
            </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:Colors.bgColor
    },
    left:{
        width:50,
        height:50
    },
    right:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        gap:10
    },
    btn1:{
        backgroundColor:Colors.secColor,
        padding:7,
        borderRadius:50
    },
    btn2:{
        text:{
            fontSize:14,
            fontFamily:'Medium',
            color:Colors.textColor,
            textTransform:'uppercase'
        },
        backgroundColor:Colors.secColor,
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:5,
    }
})
export default HeaderBar