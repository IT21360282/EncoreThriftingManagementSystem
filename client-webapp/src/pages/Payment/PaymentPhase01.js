import React from 'react'
import NavBar from '../../components/Navigation/NavBar'
import ProfileLeftpane from '../../components/ProfileLeftPane/ProfileLeftPane'
import Pay01 from '../../components/Pay/Pay01'


export default function PaymentPhase01() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <ProfileLeftpane/>
        <Pay01/>
      </div>
    </div>
  )
}
