import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AuthStyleSheet } from './Auth.style'
import { Colors } from '../../assets/Colors'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import Loader from '../../Components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Reducers/AuthReducer'
import Animated, { FadeInUp } from 'react-native-reanimated'

const SignIn = ({navigation}) => {

    //States
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(false)
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch();
    
    //Register
    const handleRegister = async()=>{
        const {name ,email,password} = user;
        if(email==='' || password==='' || name===''){
            Toast.show({
                type:'error',
                text1:'Missing',
                text2:'Both the Fields are Required',
                visibilityTime:2000
            })
        }
        else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)){
            Toast.show({
                type:'error',
                text1:'Incorrect Email Format',
                text2:'Email must be of form example@example.example',
                visibilityTime:2000
            })
        }
        else{
            setIsLoading(true);
            try{
                const {data} = await axios.post(`https://streamvid-backend.vercel.app/user/register`,{
                    name,
                    email:email.toLowerCase(),
                    password,
                    confirmPassword:password
                })
                if(data.status === 200){
                    Toast.show({
                        type:'success',
                        text1:'Register Successfull',
                        text2:`Welcome ${data.data.name} to the world of Streamvid`,
                        visibilityTime:2000
                    })
                    dispatch(login(data.data));
                    navigation.replace('Landing')
                }
                else if(data.status === 400){
                    Toast.show({
                        type:'error',
                        text1:'Register Failed',
                        text2:data.message,
                        visibilityTime:2000
                    })
                }
            }
            catch(err){
                Toast.show({
                    type:'error',
                    text1:'Register Failed',
                    text2:err.message,
                    visibilityTime:2000
                })
            }
            finally{
                setIsLoading(false)
            }
        }
    }

    // Rendering
    useEffect(()=>{
        if(auth.isAuth)navigation.replace('Landing')
    },[])

  if(isLoading) return <Loader/>
  return (
    <View style={AuthStyleSheet.container}>
        <Image style={AuthStyleSheet.bgImg} source={require('../../assets/Images/authBanner.jpg')}/>
        <View style={AuthStyleSheet.bgView}></View>
        <View style={AuthStyleSheet.content}>
            <Animated.Text entering={FadeInUp.delay(200).duration(1000).springify()} style={AuthStyleSheet.headerText}>Create your Account</Animated.Text>
            <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()} style={AuthStyleSheet.form}>
                <TextInput onChangeText={text=>setUser({...user,name:text})} style={AuthStyleSheet.input} placeholder='Name' placeholderTextColor={Colors.secColorDark} />
                <TextInput onChangeText={text=>setUser({...user,email:text})} style={AuthStyleSheet.input} placeholder='Email' placeholderTextColor={Colors.secColorDark} />
                <TextInput onChangeText={text=>setUser({...user,password:text})} style={AuthStyleSheet.input} placeholder='password' placeholderTextColor={Colors.secColorDark} secureTextEntry />
                <TouchableOpacity onPress={handleRegister} style={{...AuthStyleSheet.btn(Colors.secColor),width:'100%'}} >
                    <Text style={AuthStyleSheet.btnText(Colors.textColor)} >SignUp</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.Text entering={FadeInUp.delay(600).duration(1000).springify()} style={AuthStyleSheet.text(14,Colors.textColor)}>Already have an account?
                <Text onPress={()=>navigation.replace('SignUp')} style={AuthStyleSheet.text(14,Colors.secColorDark)}> Sign In</Text>
            </Animated.Text>
        </View>
    </View>
  )
}

export default SignIn