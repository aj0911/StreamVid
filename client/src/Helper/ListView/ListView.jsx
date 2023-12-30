import React from 'react'
import './ListView.css'
import Title from '../Title/Title'
import { FaRegPlayCircle } from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

const ListView = ({title,viewMore = true,data,count=10,largeSize=false,type}) => {
    const navigate = useNavigate();
  return (
    <div className="ListView">
        <Title title={title} type={type} viewMore={viewMore} data={data}/>
        <div className="list">
            {
                (data.length>0)?
                data.slice(0,count).map((item,index)=>{
                    if(item.poster_path===null)return;
                    return(
                    <div onClick={()=>{if(window.innerWidth<999)navigate(`/${(item.seasons)?'Series':'Movies'}/${item.id}`,{state:item})}} key={index} className={`item ${(largeSize)?'largeSize':''}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" />
                        <FaRegPlayCircle onClick={()=>{navigate(`/${(item.seasons)?'Series':'Movies'}/${item.id}`,{state:item})}} className='icon'/>
                        <button>Add to My List</button>
                    </div>
                )}):''
            }
        </div>
    </div>
  )
}

export default ListView