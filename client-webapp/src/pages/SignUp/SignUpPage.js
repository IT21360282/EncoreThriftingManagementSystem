import React from 'react'
import './signup.css'
import SignUp from '../../components/SignUp/SignUp'
import NavBar from '../../components/Navigation/NavBar'

export default function SignUpPage() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">       
        <SignUp/>
      </div>
    </div>
  )
}
