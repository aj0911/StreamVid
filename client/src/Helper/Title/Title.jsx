import React from 'react'
import './Title.css'

const Title = ({title,viewMore = true}) => {
  return (
    <div className="title">
        <h3>{title}</h3>
        {
          (viewMore)?
          <h5>{`View More > `}</h5>:''
        }
    </div>
  )
}

export default Title