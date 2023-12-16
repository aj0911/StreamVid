import React from 'react'
import './index.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Route, RouterProvider, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route />
      </Routes>
      <Footer/>
    </>
  )
}

export default App