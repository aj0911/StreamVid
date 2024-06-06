import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Colors'
import { Constants, FULLVIEW_WIDTH, getImgPath } from '../Utils/Helper'
import Animated,{FadeInDown,FadeInUp} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

const ListView = ({data,title,islarge=false,type = Constants.MOVIES,showIndex=false,viewMore=true}) => {
    // Navigation
    const navigation = useNavigation();

    //Styling
    const style = StyleSheet.create({
        listView:{
            display:'flex',
            justifyContent:'flex-start',
            alignItems:'center',
            flexDirection:'column',
            gap:10,
            width:'100%',
        },
        title:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',
            padding:'5%',
            gap:10
        },
        img:{
            width:islarge?(FULLVIEW_WIDTH - 80)/1.5:(FULLVIEW_WIDTH - 80)/2.5,
            height:islarge?300:150,
            marginRight:20,
            borderRadius:15,
            objectFit:'cover'
        },
        imgContainer:{
            shadowColor: '#ffffff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 20, // for Android
        },
    })
    const imgArr = data.map(x =>{
        if(getImgPath(type,x)!==null)return true
        return false
    })
    if(data.length===0)return null
    
    //If all objects in the data dont't have img url
    if(imgArr.every(x=>x===false)) return null 
  return (
    <View style={style.listView}>
        <View style={style.title}>
            <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} style={{fontFamily:'ExtraBold',color:Colors.textColor,fontSize:20,width:viewMore?'70%':'100%'}}>{title}</Animated.Text>
            {
                viewMore?
                <TouchableOpacity onPress={()=>navigation.push('ViewMore',{
                    title,
                    data,
                    type
                })} style={{width:'30%'}} accessibilityRole='button'>
                    <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} style={{fontFamily:'Medium',width:'100%',textAlign:'right',color:Colors.textColor,fontSize:12}}>{`View More >`}</Animated.Text>
                </TouchableOpacity>:null
            }
        </View>
        <View style={{width:'100%'}}>
            <ScrollView horizontal style={style.list}>
                {
                    data.slice(0,10).map((item,key)=>{
                        if(type===Constants.PERSON){
                            if(!item.profile_path)return null;
                            return(
                                <Animated.View 
                                entering={FadeInDown.delay(200*(key+2)).duration(1000).springify()}  
                                key={key} 
                                style={{
                                    width:(FULLVIEW_WIDTH - 80)/2.5,
                                    marginLeft:key===0?0.05*FULLVIEW_WIDTH:0,
                                    marginRight:20,
                                    justifyContent:'flex-start',
                                    alignItems:'center',
                                    gap:10,
                                }}>
                                    <TouchableOpacity 
                                    onPress={()=>navigation.push('PersonDetails',{
                                        id:item.id
                                    })} accessibilityRole='button' 
                                    style={{
                                        width:'100%',
                                        overflow:'hidden',
                                    }}>
                                        <Image 
                                        style={{
                                            borderColor:Colors.secColor,
                                            borderWidth:1,
                                            borderRadius:500,
                                            width:'100%',
                                            height:(FULLVIEW_WIDTH - 80)/2.5,
                                            objectFit:'fill'
                                        }} 
                                        source={{uri:`https://image.tmdb.org/t/p/w500${item.profile_path}`}}
                                        />
                                    </TouchableOpacity>
                                    <Text 
                                    style={{
                                        fontFamily:'Bold',
                                        fontSize:12,
                                        color:Colors.textColor,
                                        textAlign:'center'
                                    }}>
                                        {item.name}
                                    </Text>
                                </Animated.View>
                        )}
                        else{
                            if(!item.poster_path)return null;
                            if(showIndex) return(
                                <Animated.View 
                                entering={FadeInDown.delay(200*(key+2)).duration(1000).springify()} 
                                key={key} 
                                style={{
                                    width:(FULLVIEW_WIDTH - 10)/2,
                                    flexDirection:'row',
                                    justifyContent:'center',
                                    alignItems:'flex-end',
                                    gap:-10,
                                    marginRight:key===9?.05*FULLVIEW_WIDTH:0
                                }}>
                                    <Text 
                                    style={{
                                        fontFamily:'Bold',
                                        fontSize:75,
                                        textShadowColor:Colors.secColor,
                                        textShadowOffset:{width:1,height:1},
                                        textShadowRadius:20,
                                        color:Colors.bgColor
                                    }}>
                                        {key+1}
                                    </Text>
                                    <TouchableOpacity 
                                    onPress={()=>navigation.push(type===Constants.MOVIES?'MovieDetails':'SeriesDetails',{
                                        id:item.id
                                    })}
                                    accessibilityRole='button' style={{
                                        width:'60%',
                                    }}>
                                        <Image 
                                        style={{
                                            width:'100%',
                                            height:150,
                                            objectFit:'cover',
                                            borderRadius:15
                                        }} 
                                        source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}
                                        />
                                    </TouchableOpacity>
                                </Animated.View>
                            )
                            return(
                                <Animated.View 
                                entering={FadeInDown.delay(200*(key+2)).duration(1000).springify()} 
                                key={key} >
                                    <TouchableOpacity 
                                    onPress={()=>navigation.push(type===Constants.MOVIES?'MovieDetails':'SeriesDetails',{
                                        id:item.id
                                    })} accessibilityRole='button'  
                                    style={{
                                        ...style.imgContainer,
                                        paddingLeft:key===0?0.05*FULLVIEW_WIDTH:0
                                        }}>
                                        <Image 
                                        style={style.img} 
                                        source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}
                                        />
                                    </TouchableOpacity>
                                </Animated.View>
                            )
                        }
                    })
                }
            </ScrollView>
        </View>
    </View>
  )
  
}

export default ListView