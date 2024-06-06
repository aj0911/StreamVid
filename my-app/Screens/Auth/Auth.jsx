import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { AuthStyleSheet } from './Auth.style'
import { Colors } from '../../assets/Colors'
import { useSelector } from 'react-redux'
import Animated, { FadeInUp } from 'react-native-reanimated'

const Auth = ({navigation}) => {

    //States
    const auth = useSelector(state=>state.auth)

    // Rendering
    useEffect(()=>{
        if(auth.isAuth)navigation.replace('Landing')
    },[])
  return (
    <View style={AuthStyleSheet.container}>
        <Image style={AuthStyleSheet.bgImg} source={require('../../assets/Images/authBanner.jpg')}/>
        <View style={AuthStyleSheet.bgView}></View>
        <View style={AuthStyleSheet.content}>
            <Animated.View entering={FadeInUp.delay(100).duration(1000).springify()} style={AuthStyleSheet.logo} >
                <Image style={AuthStyleSheet.logoImg}  source={require('../../assets/Images/logo-bgRemove.png')}/>
                <Text style={AuthStyleSheet.logoText} >Streamvid</Text>
            </Animated.View>
            <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} style={AuthStyleSheet.text(20,Colors.textColor)} >Stream at your comfort at any time for free</Animated.Text>
            <Animated.Text entering={FadeInUp.delay(300).duration(1000).springify()} style={AuthStyleSheet.text(14,Colors.secColorDark)} >Stream unlimited Movies and Tv Shows on your Phone, Tablet, Laptop and Tv</Animated.Text>
            <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} style={AuthStyleSheet.btns}>
                <TouchableOpacity onPress={()=>navigation.replace('SignUp')} style={AuthStyleSheet.btn(Colors.secColor)} >
                    <Text style={AuthStyleSheet.btnText(Colors.textColor)} >SignIn</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.replace('SignIn')} style={AuthStyleSheet.btn()} >
                    <Text style={AuthStyleSheet.btnText(Colors.secColor)} >SignUp</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    </View>
  )
}

export default Auth