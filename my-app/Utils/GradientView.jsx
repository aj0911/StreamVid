import { View, Text } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import { Colors } from '../assets/Colors';

const GradientView = ({
        style,
        children,
        colors=['transparent',Colors.bgColorLight,Colors.bgColor],
        start={x: 0.0, y: 0.25},
        end={x: 0.5, y: 1.0},
        locations=[0.25,0.5,0.8]
    }) => {
  return (
    <LinearGradient locations={locations} colors={colors} start={start} end = {end} style={style}>
        {children}
    </LinearGradient>
  )
}

export default GradientView