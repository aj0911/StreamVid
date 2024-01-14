import React from 'react'
import { FaBookmark, FaRegPlayCircle } from 'react-icons/fa'
import './Btns.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { add } from '../../Reducers/ListsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Btns = ({item,title1='Play Now',title2='Watch Later',btn1func = ()=>{}}) => {
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth);
  const dispatch= useDispatch();
  const handleClick = ()=>{
    dispatch(add({type:1,user:auth.user,item}));
    toast.success(`Saved to your list successfully`);
  }
  return (
    <div className="btns">
        <button className='play' onClick={()=>{(title1!=='Play Now')?btn1func():navigate(`/${(item.seasons)?'Series':'Movies'}/${item.id}`,{state:item})}}>
            <h3>{title1}</h3>
            <FaRegPlayCircle/>
        </button>
        <button className='watchLater' onClick={handleClick}>
            <h3>{title2}</h3>
            <FaBookmark/>
        </button>
    </div>
  )
}

export default Btns