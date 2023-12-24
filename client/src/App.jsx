import React from 'react'
import './index.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Movies from './Components/Movies/Movies'
import Series from './Components/Series/Series'

const App = () => {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Movies' element={<Movies/>}/>
        <Route exact path='/Series' element={<Series/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App