import React, { useEffect, useState } from 'react'
import './index.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Components/Home/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Movies from './Components/Movies/Movies'
import Series from './Components/Series/Series'
import MovieDetails from './Components/Movies/MovieDetails'
import SeriesDetails from './Components/Series/SeriesDetails'
import SeriesPlayer from './Components/Series/SeriesPlayer'
import PersonDetails from './Components/Home/PersonDetails'
import ViewAll from './Helper/ViewAll/ViewAll'
import Authentication from './Components/Authentication/Authentication'
import { useSelector } from 'react-redux'
import Subscribe from './Components/Subscription/Subscribe'
import Payment from './Components/Subscription/Payment'

const App = () => {
  const [active,setActive] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth);

  useEffect(()=>{
    if(auth.isAuth===false){
      setActive(true);
      navigate('/Auth');
    }
    setActive(false);
  },[])
  return (
    <div className={`App ${active?'active':''}`}>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home active={active} setActive={setActive}/>}/>
        <Route exact path='/Movies' element={<Movies/>}/>
        <Route exact path='/Auth' element={<Authentication setActive={setActive}/>}/>}/>
        <Route exact path='/Movies/:id' element={<MovieDetails active={active} setActive={setActive}/>}/>
        <Route exact path='/Series' element={<Series/>}/>
        <Route exact path='/Series/player/:id' element={<SeriesPlayer/>}/>
        <Route exact path='/View/:title' element={<ViewAll/>}/>
        <Route exact path='/Person/:id' element={<PersonDetails/>}/>
        <Route exact path='/Subscription' element={<Subscribe/>}/>
        <Route exact path='/Payment' element={<Payment/>}/>
        <Route exact path='/Series/:id' element={<SeriesDetails active={active} setActive={setActive}/>} />
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App