import { Dimensions, StatusBar } from "react-native"

export const FULLVIEW_HEIGHT = Dimensions.get('screen').height;
export const FULLVIEW_WIDTH = Dimensions.get('screen').width;
export const StatusBarHeight = StatusBar.currentHeight;

export const Constants = {
    MOVIES:0,
    SERIES:1,
    PERSON:2
}

export const convert0Number = (num)=>{
    if(num>=1 && num<10)return `0${num}`;
    return `${num}`;
}

export const getImgPath = (type,data)=>{
    if(type===Constants.PERSON) return data.profile_path
    else return data.poster_path
}
export const getNavigationType = (type)=>{
    if(type===Constants.PERSON) return 'PersonDetails'
    if(type===Constants.MOVIES) return 'MovieDetails'
    if(type===Constants.SERIES) return 'SeriesDetails'
}

export const subscriptions = [
{
    name:'FREE PLAN',
    amountString:'Free.',
    features:[
    'Get unlimited access to thousands of shows and movies with limited ads',
    `Watch on your favorite devices`,
    `Switch plans or cancel anytime`,
    `Download from thousands of titles to watch offline`
    ],
},
{
    name:'DIAMOND PLAN',
    amountString:'₹900 per Month.',
    features:[
    'Get unlimited access to thousands of shows and movies with limited ads',
    `Watch on your favorite devices`,
    `Switch plans or cancel anytime`,
    `Download from thousands of titles to watch offline`
    ]
},
{
    name:'PLATINUM PLAN',
    amountString:'₹3,391 every 2 Months.',
    features:[
    'Get unlimited access to thousands of shows and movies with limited ads',
    `Watch on your favorite devices`,
    `Switch plans or cancel anytime`,
    `Download from thousands of titles to watch offline`
    ]
},
]