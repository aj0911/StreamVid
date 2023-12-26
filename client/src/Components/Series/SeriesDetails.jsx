import React from 'react'
import { useLocation } from 'react-router-dom'

const SeriesDetails = () => {
    const {state:data} = useLocation();
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default SeriesDetails