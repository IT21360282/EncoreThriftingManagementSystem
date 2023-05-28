import React from 'react'
import Display from '../../components/Display/Display'
import LeftPane from '../../components/LeftPane/LeftPane'
import NavBar from '../../components/Navigation/NavBar'
import "./home.css"
// import Footer from '../../components/Footer/Footer'


export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="bottomContainer">
        <LeftPane/>
        <Display/>
        
      </div>
    </div>
  )
}
