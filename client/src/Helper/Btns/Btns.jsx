import React from 'react'
import { FaBookmark, FaRegPlayCircle } from 'react-icons/fa'
import './Btns.css'
import { useNavigate } from 'react-router-dom'

const Btns = ({item,title1='Play Now',title2='Watch Later',btn1func = ()=>{}}) => {
  const navigate = useNavigate();
  return (
    <div className="btns">
        <button className='play' onClick={()=>{(item)?navigate(`/${(item.seasons)?'Series':'Movies'}/${item.id}`,{state:item}):btn1func()}}>
            <h3>{title1}</h3>
            <FaRegPlayCircle/>
        </button>
        <button className='watchLater' onClick={()=>console.log('clicked')}>
            <h3>{title2}</h3>
            <FaBookmark/>
        </button>
    </div>
  )
}

export default Btns