import React from 'react'
import './Title.css'
import {useNavigate} from 'react-router-dom'

const Title = ({title,viewMore = true,data,type}) => {
  const navigate = useNavigate();
  return (
    <div className="title">
        <h3>{title}</h3>
        {
          (viewMore)?
          <h5 onClick={()=>navigate(`/View/${title}`,{state:{data,type}})}>{`View More > `}</h5>:''
        }
    </div>
  )
}

export default Title