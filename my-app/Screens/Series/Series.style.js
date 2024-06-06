import { StyleSheet } from "react-native";
import { Colors } from "../../assets/Colors";
import { FULLVIEW_WIDTH } from "../../Utils/Helper";

export const seriesStyleSheet = StyleSheet.create({
    series:{
        backgroundColor:Colors.bgColor,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:20,
        paddingVertical:20
    },
    SD_EPISODES:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        gap:20,
        width:FULLVIEW_WIDTH
    },
    SD_Title:{
        fontFamily:'Bold',
        fontSize:18,
        color:Colors.textColor,
        paddingHorizontal:.05*FULLVIEW_WIDTH
    },
    SD_Episode:{
        width:FULLVIEW_WIDTH*.9,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginHorizontal:.05*FULLVIEW_WIDTH,
        gap:5,
    }
})