import React, { useEffect, useState } from 'react'
import './index.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Movies from './Components/Movies/Movies'
import Series from './Components/Series/Series'
import MovieDetails from './Components/Movies/MovieDetails'
import SeriesDetails from './Components/Series/SeriesDetails'

const App = () => {
  const [active,setActive] = useState(false);
  useEffect(()=>{
    setActive(false);
  },[])
  return (
    <div className={`App ${active?'active':''}`}>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Movies' element={<Movies/>}/>
        <Route exact path='/Movies/:id' element={<MovieDetails active={active} setActive={setActive}/>}/>
        <Route exact path='/Series' element={<Series/>}/>
        <Route exact path='/Series/:id' element={<SeriesDetails/>}/>

      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App