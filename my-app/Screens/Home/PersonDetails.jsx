import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import useFetch from '../../Utils/Hooks/useFetch';
import Loader from '../../Components/Loader';
import { movieStyleSheet } from '../Movies/Movie.style';
import { Ionicons } from '@expo/vector-icons';
import GradientView from '../../Utils/GradientView';
import { Colors } from '../../assets/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';
import ListView from '../../Components/ListView';
import { Constants } from '../../Utils/Helper';

const PersonDetails = ({route,navigation}) => {

  // States
  const {id} = route.params;
  const [data,isLoading,error] = useFetch([
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&append_to_response=videos,images,credits`
  ])
  useEffect(()=>{
    if(error) navigation.navigate('Error')
  },[error])
  if(data.length>0 && !isLoading){
    const person = data[0];
    return (
      <ScrollView>
          <View style={movieStyleSheet.MD}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={movieStyleSheet.MD_Back}>
              <Ionicons name="arrow-back-outline" size={24} color={Colors.textColor} />  
            </TouchableOpacity>
            <GradientView style={{...movieStyleSheet.MD_Banner,minHeight:'auto'}}>
              <View style={movieStyleSheet.MD_Content}>
                <Animated.Image entering={FadeInUp.delay(100).duration(200).springify()} style={movieStyleSheet.MD_Img} source={{uri:`https://image.tmdb.org/t/p/w500${person.profile_path}`}}/>
                <Animated.Text entering={FadeInUp.delay(200).duration(200).springify()} style={movieStyleSheet.MD_Title}><Text style={{color:Colors.secColor,fontSize:24}}>{person.name[0]}</Text>{person.name.slice(1)}</Animated.Text>
                {
                  person.biography?
                  <Animated.View style={{
                    justifyContent:'flex-start',
                    alignItems:'flex-start',
                    gap:10
                  }} entering={FadeInUp.delay(300).duration(200).springify()}>
                    <Text style={{
                      fontSize:16,
                      fontFamily:'Bold',
                      color:Colors.textColor
                    }}>Biography</Text>
                    <Text style={{
                      fontSize:12,
                      fontFamily:'Medium',
                      color:Colors.secColorDark
                    }}>{person.biography}</Text>
                  </Animated.View>:null
                }
                <Animated.View style={{
                    justifyContent:'flex-start',
                    alignItems:'flex-start',
                    gap:10
                  }} entering={FadeInUp.delay(300).duration(200).springify()}>
                    <Text style={{
                      fontSize:16,
                      fontFamily:'Bold',
                      color:Colors.textColor
                    }}>Personal Info</Text>
                    {
                      [
                          {'Known For':person.known_for_department},
                          {'Gender':person.gender===1?'Female':'Male'},
                          {'Birthday':person.birthday},
                          {'Place Of Birth':person.place_of_birth},
                          {'Also Known as':person.also_known_as[0]}
                      ].map((element,index)=>{
                        if(element[Object.keys(element)[0]])
                        return(
                          <Animated.View style={{
                            justifyContent:'flex-start',
                            alignItems:'center',
                            flexDirection:"row",
                            gap:5
                          }} 
                          entering={FadeInUp.delay((index+4)*100).duration(200).springify()} key={index}>
                              <Text style={{
                                width:'30%',
                                textAlign:'left',
                                fontFamily:'Bold',
                                color:Colors.secColor,
                                fontSize:12
                              }}>{Object.keys(element)[0]} : </Text>
                              <Text style={{
                                width:'70%',
                                textAlign:'left',
                                fontFamily:'Medium',
                                color:Colors.secColorLight,
                                fontSize:12
                              }}>{element[Object.keys(element)[0]]}</Text>
                          </Animated.View>
                      )})
                  }
                  </Animated.View>
              </View>
            </GradientView>
            <ListView title={'Best Acting'} type={Constants.MOVIES} data={person.credits.cast}/>
          </View>
        </ScrollView>
    )
  }
  else return <Loader/>
}

export default PersonDetails