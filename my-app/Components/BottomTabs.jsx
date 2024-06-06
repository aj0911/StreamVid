import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/HomeScreen'
import MoviesScreen from '../Screens/Movies/MoviesScreen'
import SeriesScreen from '../Screens/Series/SeriesScreen'
import { FontAwesome5, Foundation, Ionicons,MaterialIcons } from '@expo/vector-icons';
import { indexStyleSheet } from '../index.style';
import { Colors } from '../assets/Colors';

const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}) => {

    //Bottom Tabs Screen Options
    const screenOptions = {
        headerShown:false,
        tabBarShowLabel:false,
        tabBarStyle:indexStyleSheet.tabBarStyle,
    }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={{        
        tabBarIcon:({focused})=>(
            <View style={indexStyleSheet.BottomTabs}>
                <Ionicons name='home' color={focused?Colors.bgColor:Colors.textColor} size={24}/>
                <Text style={indexStyleSheet.BottomTabs.text(focused)}>Home</Text>
            </View>
        ),
      }}/>
      <Tab.Screen name="Movies" component={MoviesScreen}  options={{        
        tabBarIcon:({focused})=>(
            <View style={indexStyleSheet.BottomTabs}>
                <FontAwesome5 name="film" color={focused?Colors.bgColor:Colors.textColor} size={24} />
                <Text style={indexStyleSheet.BottomTabs.text(focused)}>Movies</Text>
            </View>
        )
      }}/>
      <Tab.Screen name="Series" component={SeriesScreen}  options={{        
        tabBarIcon:({focused})=>(
            <View style={indexStyleSheet.BottomTabs}>
                <Foundation name="monitor" color={focused?Colors.bgColor:Colors.textColor} size={24} />
                <Text style={indexStyleSheet.BottomTabs.text(focused)}>Series</Text>
            </View>
        )
      }}/>
    </Tab.Navigator>
  )
}

export default BottomTabs