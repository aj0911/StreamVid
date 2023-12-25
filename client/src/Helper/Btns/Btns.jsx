import React from 'react'
import { FaBookmark, FaRegPlayCircle } from 'react-icons/fa'
import './Btns.css'

const Btns = () => {
  return (
    <div className="btns">
        <button className='play' onClick={()=>console.log('clicked')}>
            <h3>Play Now</h3>
            <FaRegPlayCircle/>
        </button>
        <button className='watchLater' onClick={()=>console.log('clicked')}>
            <h3>Watch Later</h3>
            <FaBookmark/>
        </button>
    </div>
  )
}

export default Btns