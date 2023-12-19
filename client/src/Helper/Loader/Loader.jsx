import React from 'react'
import './Loader.css'

const Loader = ({size}) => {
  return (
    <div className="loader">
        <div className="box" style={{width:size,height:size}}></div>
    </div>
  )
}

export default Loader