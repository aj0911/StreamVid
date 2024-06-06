import { StyleSheet } from "react-native";
import { Colors } from "./assets/Colors";
import { FULLVIEW_HEIGHT } from "./Utils/Helper";

export const indexStyleSheet = StyleSheet.create({
    wrapper:{
        backgroundColor:Colors.bgColor,
        height:FULLVIEW_HEIGHT,
        width:'100%',
    },
    BottomTabs:{
        text:(focused)=>{
            return{
                fontFamily:'Medium',
                color:focused?Colors.bgColor:Colors.textColor,
                fontSize:16
            }
        },
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:.2,
    },
    tabBarStyle:{
        position:'absolute',
        left:0,
        bottom:0,
        width:'100%',
        height:100,
        paddingBottom:30,
        elevation:0,
        backgroundColor:Colors.secColor,
        display:'flex',
        flexDirection:'row',
    }
})

