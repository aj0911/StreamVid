var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
export const getMonth = (monthIndex)=>months[monthIndex];

export const convert0Number = (num)=>{
    if(num>=1 && num<10)return `0${num}`;
    return `${num}`;
  }


export const TYPE = {
  MOVIE:'Movies',
  SERIES:'Series',
  PERSON:'Person'
}