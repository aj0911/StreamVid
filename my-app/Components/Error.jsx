import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import GradientView from '../Utils/GradientView'
import { FULLVIEW_HEIGHT, FULLVIEW_WIDTH } from '../Utils/Helper'
import { Colors } from '../assets/Colors'
import * as Updates from 'expo-updates';

const Error = ({}) => {

  return (
    <GradientView style={{
        width:FULLVIEW_WIDTH,
        height:FULLVIEW_HEIGHT,
        backgroundColor:Colors.bgColor,
        justifyContent:'center',
        alignItems:'center',
    }}>
     <View style={{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
     }}>
      <Image style={{
        width:.7*FULLVIEW_WIDTH,
        height:200
      }} source={require('../assets/Images/404.png')}/>
      <Text style={{
        paddingHorizontal:.05*FULLVIEW_WIDTH,
        fontFamily:'Medium',
        color:Colors.secColorDark,
        textAlign:'center',
        marginTop:20,
        marginBottom:40,
        fontSize:16
      }}>Looks like we lost connection. Please try and refresh the page</Text>
      <TouchableOpacity onPress={()=>Updates.reloadAsync()} style={{
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
       }}>Reload</Text>
      </TouchableOpacity>
     </View>
    </GradientView>
  )
}

export default Error