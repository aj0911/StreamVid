import React, { useRef } from 'react'
import './Header.css'
import { FaFilm, FaHome, FaSearch, FaTv, FaUser } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();
    const nav = useRef();
    document.addEventListener('scroll',()=>{
        if(window.scrollY>20){
            nav.current.classList.add('sticky')
        }
        if(window.scrollY<20){
            nav.current.classList.remove('sticky')
        }
    })

  return (
    <header ref={nav}>
        <div className="left">
            <div className="logo">
                <img src={require('../../Assets/logo-bgRemove.png')} alt="" />
                <NavLink to={'/'} className={'logoTitle'}>Streamvid</NavLink>
            </div>
            <div className="links">
                <NavLink to={'/'} className={ ({isActive})=>((isActive)?'link active':'link')}><FaHome className='linkIcon'/><span>Home</span></NavLink>
                <NavLink to={'/Movies'} className={ ({isActive})=>((isActive)?'link active':'link')}><FaFilm className='linkIcon'/><span>Movies</span></NavLink>
                <NavLink to={'/Series'} className={ ({isActive})=>((isActive)?'link active':'link')}><FaTv className='linkIcon'/><span>Series</span></NavLink>
            </div>
        </div>
        <div className="right">
            <div className="search">
                <FaSearch className='icon'/>
                <input type="text" placeholder='Find movies,TV shows, Series,...' />
            </div>
            <NavLink to={'/Profile'}><FaUser className='profile'/></NavLink>
            <button onClick={()=>navigate('/Subscription')}>Subscrible</button>
        </div>
    </header>
  )
}

export default Header