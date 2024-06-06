import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { FULLVIEW_HEIGHT, FULLVIEW_WIDTH } from '../Utils/Helper'
import { Colors } from '../assets/Colors'
import LottieView from 'lottie-react-native';

const Loader = ({size=70}) => {
  return (
    <View style={{
        width:FULLVIEW_WIDTH,
        height:FULLVIEW_HEIGHT,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.bgColor,
        paddingBottom:FULLVIEW_HEIGHT/4
    }}>
      <LottieView autoPlay source={require('../assets/Animations/loader.json')} style={{
        width:size,
        height:size,
      }}/>
    </View>
  )
}

export default Loader