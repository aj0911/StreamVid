import { useSelector } from "react-redux";

var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
export const getMonth = (monthIndex)=>months[monthIndex];

export const convert0Number = (num)=>{
    if(num>=1 && num<10)return `0${num}`;
    return `${num}`;
  }


export const urlPrefix = `https://streamvid-backend.vercel.app/`;

export const TYPE = {
  MOVIE:'Movies',
  SERIES:'Series',
  PERSON:'Person'
}

export const authItems = {
  ENTRY:'ENTRY',
  SIGNIN:'SIGNIN',
  SIGNUP:'SIGNUP'
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