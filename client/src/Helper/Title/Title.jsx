import React from 'react'
import './Title.css'

const Title = ({title}) => {
  return (
    <div className="title">
        <h3>{title}</h3>
        <h5>{`View More > `}</h5>
    </div>
  )
}

export default Title