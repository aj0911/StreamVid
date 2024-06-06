import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { indexStyleSheet } from './index.style';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './Components/BottomTabs';
import HeaderBar from './Components/HeaderBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetails from './Screens/Movies/MovieDetails';
import SeriesDetails from './Screens/Series/SeriesDetails';
import PersonDetails from './Screens/Home/PersonDetails';
import YoutubePlayer from './Components/YoutubePlayer';
import ViewMore from './Components/ViewMore';
import SearchScreen from './Screens/Home/SearchScreen';
import Error from './Components/Error';
import Auth from './Screens/Auth/Auth';
import SignIn from './Screens/Auth/SignIn';
import SignUp from './Screens/Auth/SignUp';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Colors } from './assets/Colors';
import { useDispatch, useSelector } from 'react-redux';
import User from './Screens/Auth/User';
import Subscription from './Screens/Auth/Subscription';
import Payment from './Screens/Auth/Payment';
import { StatusBar } from 'expo-status-bar'

SplashScreen.preventAutoHideAsync();

export default function App() {

  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch();

  const [fontsLoaded, fontError] = useFonts({
    Bold:require('./assets/Fonts/Lexend-Bold.ttf'),
    ExtraBold:require('./assets/Fonts/Lexend-ExtraBold.ttf'),
    ExtraLight:require('./assets/Fonts/Lexend-ExtraLight.ttf'),
    Black:require('./assets/Fonts/Lexend-Black.ttf'),
    Light:require('./assets/Fonts/Lexend-Light.ttf'),
    Medium:require('./assets/Fonts/Lexend-Medium.ttf'),
    Regular:require('./assets/Fonts/Lexend-Regular.ttf'),
    SemiBold:require('./assets/Fonts/Lexend-SemiBold.ttf'),
    Thin:require('./assets/Fonts/Lexend-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  })

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const Stack = createNativeStackNavigator();
  return (
    <View style={indexStyleSheet.wrapper} onLayout={onLayoutRootView}>
      <StatusBar style='light' translucent={true} />
      <NavigationContainer>
        <Stack.Navigator  initialRouteName={auth.isAuth?'Landing':'Auth'} screenOptions={{headerShown:false}}>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
          <Stack.Screen name="SeriesDetails" component={SeriesDetails} />
          <Stack.Screen name="PersonDetails" component={PersonDetails} />
          <Stack.Screen name="ViewMore" component={ViewMore} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Error" component={Error} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Subscription" component={Subscription} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen options={{animationEnabled: false}} name="YoutubePlayer" component={YoutubePlayer} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={{
        success: (props) => (
          <BaseToast
            {...props}
            style={{ borderLeftColor: Colors.secColorGold, backgroundColor:Colors.bgColorLight }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
              fontFamily:'Bold',
              color:Colors.secColorGold
            }}
            text2Style={{
              fontFamily:'Medium',
              color:Colors.textColor
            }}
          />
        ),
        error: (props) => (
          <BaseToast
            {...props}
            style={{ backgroundColor:Colors.bgColorLight,borderLeftColor: Colors.secColorWarn }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
              fontFamily:'Bold',
              color:Colors.secColorWarn
            }}
            text2Style={{
              fontFamily:'Medium',
              color:Colors.textColor
            }}
          />
        ),
      }}/>
    </View>
  );
}

const LandingScreen = ({navigation})=>{
  const auth = useSelector(x=>x.auth)

  useEffect(()=>{
    if(!auth.isAuth)navigation.replace('Auth')
  },[])
  return(
    <>
      <HeaderBar/>
      <BottomTabs/>
    </>
  )
}


