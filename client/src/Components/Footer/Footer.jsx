import React from 'react'
import './Footer.css'
import { useSelector } from 'react-redux'

const Footer = () => {
  const auth = useSelector(state=>state.auth)

  return (
    auth.isAuth?
    <footer>
      <p>Copyright &copy; {(new Date(Date.now())).getFullYear()} StreamVid AJ. All rights reserved.</p>
    </footer>:''
  )
}

export default Footer