import React from 'react'
import './loginPage.css'
import NavBar from '../../components/Navigation/NavBar'
import Login from '../../components/Login/Login'

export default function LoginPage() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">       
        <Login/>
      </div>
    </div>
  )
}
