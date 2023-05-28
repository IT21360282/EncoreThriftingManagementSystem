import React from 'react'
import LeftPane from '../../components/LeftPane/LeftPane'
import NavBar from '../../components/Navigation/NavBar'
import './aboutus.css'
import About from '../../components/About/About'



export default function AboutUs() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <About/>
      </div>
    </div>
  )
}
