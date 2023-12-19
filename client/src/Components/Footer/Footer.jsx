import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; {(new Date(Date.now())).getFullYear()} StreamVid AJ. All rights reserved.</p>
    </footer>
  )
}

export default Footer