import { View, Platform, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Colors'
import { StatusBarHeight } from '../Utils/Helper'

const SafeAreaViewAndroid = ({Component,...rest}) => {
    return (
        <View style={{
          backgroundColor:Colors.bgColor,
          paddingTop:Platform.OS==="android"?StatusBarHeight:0
          }}>
          <SafeAreaView>
              <Component {...rest}/>
          </SafeAreaView>
        </View>
      )
}

export default SafeAreaViewAndroid